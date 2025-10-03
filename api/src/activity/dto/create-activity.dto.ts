import { IsString, IsNotEmpty, IsOptional, IsNumber, IsUUID, IsEnum, IsInt } from 'class-validator';

enum ACTIVITY_TYPE {
  CARDIO = 'CARDIO',
  STRENGTH = 'STRENGTH',
  FLEXIBILITY = 'FLEXIBILITY',
  BALANCE = 'BALANCE',
}

export class CreateActivityDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(ACTIVITY_TYPE)
  @IsNotEmpty()
  ACTIVITY_TYPE: ACTIVITY_TYPE;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNumber()
  @IsOptional()
  weight?: number;

  @IsInt()
  @IsOptional()
  reps?: number;

  @IsInt()
  @IsOptional()
  sets?: number;

  @IsInt()
  @IsOptional()
  duration?: number;

  @IsUUID()
  @IsNotEmpty()
  planId: string;
}
