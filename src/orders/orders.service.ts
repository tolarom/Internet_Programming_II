import { Injectable, NotFoundException } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { ApiKeyGuard } from 'src/common/guards/api-key.guard';
import { Get, Post, Patch, Delete, Param, Body,  } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import {Order} from 'src/database/entities/order.entity';
import { Repository } from 'typeorm';
import { NotificationsService } from 'src/notifications/notifications.service';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class OrdersService {

    constructor(
        @InjectRepository(Order)
        private readonly receiptRepo: Repository<Order>,
        private readonly notifications: NotificationsService, // ✅ DI
      ) {}
    
      async findAll() {
        const orders = await this.receiptRepo.find({ order: { orderAt: 'DESC' } });
        this.notifications.notify('order_fetched', { count: orders.length }); // ✅ Notify on fetch
        return orders;
      }
    
      async findOne(orderId: string) {
        const orders = await this.receiptRepo.findOne({ where: { orderId } });
        if (!orders) throw new NotFoundException('Order not found');
        return orders;
      }
    
      async create(dto: CreateOrderDto) {
        const order = this.receiptRepo.create({
          orderAt: dto.orderAt,
          name: dto.name,
          totalAmount: dto.totalAmount,
        });
    
        const saved = await this.receiptRepo.save(order);
    
        this.notifications.notify('order_created', {
          orderId: saved.orderId,
          name: saved.name,
          totalAmount: saved.totalAmount,
        });
    
        return saved;
      }
    
      async update(orderId: string, dto: UpdateOrderDto) {
        const order = await this.findOne(orderId);
    
        if (dto.orderAt !== undefined) order.orderAt = dto.orderAt;
        if (dto.name !== undefined) order.name = dto.name;
        if (dto.totalAmount !== undefined) order.totalAmount = dto.totalAmount;
    
        return this.receiptRepo.save(order);
      }
    
      async remove(orderId: string) {
        const order = await this.findOne(orderId);
        await this.receiptRepo.remove(order);
        return { deleted: true, orderId };
      }
}
