import { IsString, IsArray, ValidateNested, IsDateString, IsNumber, IsOptional } from 'class-validator';
export class CreateOrderDto {

    @IsDateString()
    orderAt!: string;

    @IsString()
    name!: string;

    @IsNumber()
    totalAmount!: number;

    @IsOptional()
    @IsString()
    status?: string;
  }
