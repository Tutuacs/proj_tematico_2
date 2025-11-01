import { IsDateString, IsNotEmpty, IsUUID, IsEnum } from 'class-validator';

enum WEEK_DAYS {
  SUNDAY = 'SUNDAY',
  MONDAY = 'MONDAY',
  TUESDAY = 'TUESDAY',
  WEDNESDAY = 'WEDNESDAY',
  THURSDAY = 'THURSDAY',
  FRIDAY = 'FRIDAY',
  SATURDAY = 'SATURDAY',
}

export class CreateTrainDto {
  @IsEnum(WEEK_DAYS)
  @IsNotEmpty()
  weekDay: WEEK_DAYS;

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
