import { IsString, IsBoolean, IsDateString } from 'class-validator';

export class CreateUserDto {
  @IsString()
  userName: string;

  @IsString()
  password: string;

  @IsDateString()
  birth: string;

  @IsBoolean()
  admin: boolean;
}
