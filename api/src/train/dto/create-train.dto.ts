import { IsISO8601, IsNotEmpty, IsUUID, IsEnum } from 'class-validator';

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

  @IsISO8601({ strict: true })
  @IsNotEmpty()
  from: string;

  @IsISO8601({ strict: true })
  @IsNotEmpty()
  to: string;

  @IsUUID()
  @IsNotEmpty()
  planId: string;
}
