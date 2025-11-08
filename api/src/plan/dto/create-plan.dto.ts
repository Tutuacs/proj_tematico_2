import { IsString, IsNotEmpty, IsOptional, IsUUID, IsISO8601 } from 'class-validator';

export class CreatePlanDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsISO8601({ strict: true })
  @IsNotEmpty()
  from: string;

  @IsISO8601({ strict: true })
  @IsNotEmpty()
  to: string;

  @IsUUID()
  @IsNotEmpty()
  traineeId: string;
}
