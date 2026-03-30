import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { NotificationsModule } from 'src/notifications/notifications.module';
import { Order } from 'src/database/entities/order.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Order]), NotificationsModule],
  providers: [OrdersService],
  controllers: [OrdersController]
})
export class OrdersModule {}
