import { IsEmail, IsString, IsOptional, IsInt, IsUUID } from 'class-validator';

export class UpdateProfileDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  password?: string;

  @IsInt()
  @IsOptional()
  role?: number;

  @IsUUID()
  @IsOptional()
  trainerId?: string;
}
