import { IsNumber, IsString, IsOptional } from 'class-validator';

export class QuoteDto {
  @IsNumber()
  amount: number;

  @IsString()
  from: string;

  @IsString()
  to: string;

  @IsOptional()
  @IsString()
  userId?: string;
}
