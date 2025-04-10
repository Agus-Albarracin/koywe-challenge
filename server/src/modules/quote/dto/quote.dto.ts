import { IsNumber, IsString } from 'class-validator';

export class QuoteDto {
  @IsNumber()
  amount: number;

  @IsString()
  from: string;

  @IsString()
  to: string;
}
