import { IsString, IsDateString, IsNumber, IsOptional } from 'class-validator';
export class UpdateOrderDto {

    @IsOptional()
    @IsDateString()
    orderAt?: string;

    @IsOptional()
    @IsString()
    name?: string;

    @IsOptional()
    @IsNumber()
    totalAmount?: number;

    @IsOptional()
    @IsString()
    status?: string;
  }
