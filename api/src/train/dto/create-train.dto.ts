import { IsDateString, IsNotEmpty, IsUUID } from 'class-validator';

export class CreateTrainDto {
  @IsDateString()
  @IsNotEmpty()
  from: Date;

  @IsDateString()
  @IsNotEmpty()
  to: Date;

  @IsUUID()
  @IsNotEmpty()
  planId: string;
}
