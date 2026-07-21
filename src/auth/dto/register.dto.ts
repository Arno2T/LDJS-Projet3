import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ example: 'test@test.com' })
  @IsEmail()
  email!: string;

  @ApiProperty({ example: 'Juste LeBlanc' })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({ example: 'MyPassword', minLength: 6 })
  @IsString()
  @MinLength(6)
  password!: string;
}
