import { IsEmail, IsNotEmpty, IsString, IsOptional, IsInt, IsUUID } from 'class-validator';

export class CreateProfileDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsInt()
  @IsOptional()
  role?: number = 0;

  @IsUUID()
  @IsOptional()
  trainerId?: string;
}
