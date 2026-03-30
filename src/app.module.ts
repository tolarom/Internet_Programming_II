import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Receipt } from './database/entities/receipts.entity';
import { ReceiptsController } from './receipts/receipts.controller';
import { ReceiptsService } from './receipts/receipts.service';
import { ConfigModule } from '@nestjs/config';
import { NotificationsModule } from './notifications/notifications.module';
import { ReceiptsModule } from './receipts/receipts.module';
import { OrdersModule } from './orders/orders.module';
import { OrdersController } from './orders/orders.controller';
import { OrdersService } from './orders/orders.service';
import { Order } from './database/entities/order.entity';

ConfigModule.forRoot();

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'nachoo',
      database: 'nest_js_tp',
      entities: [Receipt, Order],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Receipt, Order]),
    NotificationsModule,
    ReceiptsModule,
    OrdersModule,
  ],
  controllers: [AppController, ReceiptsController, OrdersController],
  providers: [AppService, ReceiptsService, OrdersService],
})
export class AppModule {}
