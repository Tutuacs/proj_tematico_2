import { IsString, IsNotEmpty, IsOptional, IsUUID, IsDateString } from 'class-validator';

export class CreatePlanDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsDateString()
  @IsOptional()
  from?: Date;

  @IsDateString()
  @IsOptional()
  to?: Date;

  @IsUUID()
  @IsNotEmpty()
  traineeId: string;
}
