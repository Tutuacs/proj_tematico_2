import { IsString, IsOptional, IsNumber, IsUUID } from 'class-validator';

export class CreateReportDto {
  @IsString()
  @IsOptional()
  content?: string;

  @IsNumber()
  @IsOptional()
  imc?: number;

  @IsNumber()
  @IsOptional()
  bodyFat?: number;

  @IsNumber()
  @IsOptional()
  weight?: number;

  @IsNumber()
  @IsOptional()
  height?: number; // altura em cm

  @IsUUID()
  profileId: string;

  @IsUUID()
  @IsOptional()
  planId?: string;
}
