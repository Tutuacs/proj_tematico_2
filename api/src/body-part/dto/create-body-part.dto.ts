import { IsString, IsNotEmpty, IsOptional, IsNumber, IsUUID } from 'class-validator';

export class CreateBodyPartDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsOptional()
  bodyFat?: number;

  @IsUUID()
  @IsNotEmpty()
  reportId: string;
}
