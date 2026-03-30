import { Controller } from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { ApiKeyGuard } from 'src/common/guards/api-key.guard';
import { Get, Post, Patch, Delete, Param, Body,  } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { UpdateReceiptDto } from 'src/receipts/dto/update-receipt.dto';

@UseGuards(ApiKeyGuard)
@Controller('orders')
export class OrdersController {
     constructor(private readonly OrdersService: OrdersService) {}
     
       @Get()
       findAll() {
         return this.OrdersService.findAll();
       }
     
       @Get(':id')
       findOne(@Param('id') id: string) {
         return this.OrdersService.findOne(id);
       }
     
       @Post()
       create(@Body() dto: CreateOrderDto) {
         return this.OrdersService.create(dto);
       }
     
       @Patch(':id')
       update(@Param('id') id: string, @Body() dto: UpdateOrderDto) {
         return this.OrdersService.update(id, dto);
       }
     
       @Delete(':id')
       remove(@Param('id') id: string) {
         return this.OrdersService.remove(id);
       }
}
