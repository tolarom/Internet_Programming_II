import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Receipt } from './database/entities/receipts.entity';
import { ReceiptsController } from './receipts/receipts.controller';
import { ReceiptsService } from './receipts/receipts.service';
import { ConfigModule } from '@nestjs/config';

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
      entities: [Receipt],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Receipt]),
  ],
  controllers: [AppController, ReceiptsController],
  providers: [AppService, ReceiptsService],
})
export class AppModule {}
