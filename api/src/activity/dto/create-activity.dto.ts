import { IsString, IsNotEmpty, IsOptional, IsNumber, IsUUID, IsEnum, IsInt, Min } from 'class-validator';

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
  @Min(0.01)
  weight?: number;

  @IsInt()
  @IsOptional()
  @Min(1)
  reps?: number;

  @IsInt()
  @IsOptional()
  @Min(1)
  sets?: number;

  @IsInt()
  @IsOptional()
  @Min(1)
  duration?: number;

  @IsUUID()
  @IsNotEmpty()
  planId: string;
}
