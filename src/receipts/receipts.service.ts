import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Receipt } from 'src/database/entities/receipts.entity';
import { CreateReceiptDto } from './dto/create-receipt.dto';
import { UpdateReceiptDto } from './dto/update-receipt.dto';
import { NotificationsService } from 'src/notifications/notifications.service';

@Injectable()
export class ReceiptsService {
  constructor(
    @InjectRepository(Receipt)
    private readonly receiptRepo: Repository<Receipt>,
    private readonly notifications: NotificationsService, // ✅ DI
  ) {}

  async findAll() {
    const receipts = await this.receiptRepo.find({ order: { issuedAt: 'DESC' } });
    this.notifications.notify('receipts_fetched', { count: receipts.length }); // ✅ Notify on fetch
    return receipts;
  }

  async findOne(receiptId: string) {
    const receipt = await this.receiptRepo.findOne({ where: { receiptId } });
    if (!receipt) throw new NotFoundException('Receipt not found');
    return receipt;
  }

  async create(dto: CreateReceiptDto) {
    const receipt = this.receiptRepo.create({
      issuedAt: new Date(dto.issuedAt),
      name: dto.name,
      price: dto.price,
    });

    const saved = await this.receiptRepo.save(receipt);

    this.notifications.notify('receipt_created', {
      receiptId: saved.receiptId,
      price: saved.price,
    });

    return saved;
  }

  async update(receiptId: string, dto: UpdateReceiptDto) {
    const receipt = await this.findOne(receiptId);

    const changed: any = {};

    if (dto.issuedAt !== undefined) {
      const newDate = new Date(dto.issuedAt);
      const oldIso = receipt.issuedAt ? new Date(receipt.issuedAt).toISOString() : null;
      if (oldIso !== newDate.toISOString()) {
        receipt.issuedAt = newDate;
        changed.issuedAt = newDate;
      }
    }

    if (dto.name !== undefined && dto.name !== receipt.name) {
      receipt.name = dto.name;
      changed.name = dto.name;
    }

    if (dto.price !== undefined && dto.price !== receipt.price) {
      receipt.price = dto.price;
      changed.price = dto.price;
    }

    const saved = await this.receiptRepo.save(receipt);

    if (Object.keys(changed).length > 0) {
      this.notifications.notify('receipt_updated', Object.assign({ receiptId: saved.receiptId }, changed));
    }

    return saved;
  }

  async remove(receiptId: string) {
    const receipt = await this.findOne(receiptId);
    await this.receiptRepo.remove(receipt);
    return { deleted: true, receiptId };
  }
}
