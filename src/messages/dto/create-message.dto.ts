import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateMessageDto {
  @ApiProperty({ example: 'message' })
  @IsString()
  @IsNotEmpty()
  message!: string;

  @ApiProperty({ example: 1 })
  @IsNumber()
  user_id!: number;

  @ApiProperty({ example: 1 })
  @IsNumber()
  rental_id!: number;
}
