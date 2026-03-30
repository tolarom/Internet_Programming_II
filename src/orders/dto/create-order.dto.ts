import { IsString, IsArray, ValidateNested, IsDateString, IsNumber } from 'class-validator';
export class CreateOrderDto {

    @IsDateString()
    orderAt: string;

    @IsString()
    name: string;

    @IsNumber()
    totalAmount: number;
  }
