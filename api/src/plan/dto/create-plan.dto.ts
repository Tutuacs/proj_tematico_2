import { IsString, IsNotEmpty, IsOptional, IsUUID, IsEnum, IsDateString } from 'class-validator';

enum WEEK_DAYS {
  SUNDAY = 'SUNDAY',
  MONDAY = 'MONDAY',
  TUESDAY = 'TUESDAY',
  WEDNESDAY = 'WEDNESDAY',
  THURSDAY = 'THURSDAY',
  FRIDAY = 'FRIDAY',
  SATURDAY = 'SATURDAY',
}

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

  @IsEnum(WEEK_DAYS)
  @IsNotEmpty()
  weekDay: WEEK_DAYS;

  @IsUUID()
  @IsOptional()
  trainerId?: string;

  @IsUUID()
  @IsNotEmpty()
  traineeId: string;
}
