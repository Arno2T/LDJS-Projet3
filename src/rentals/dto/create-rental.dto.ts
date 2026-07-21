import { IsString, IsNumber, IsNotEmpty, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRentalDto {
  @ApiProperty({ example: 'Appartement Paris' })
  @IsString()
  @IsNotEmpty()
  name!: string;

  @ApiProperty({ example: 50 })
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  surface!: number;

  @ApiProperty({ example: 1000 })
  @Type(() => Number)
  @IsNumber()
  @IsNotEmpty()
  @Min(1)
  price!: number;

  @ApiProperty({ example: 'Bel appartement au coeur de Paris' })
  @IsString()
  @IsNotEmpty()
  description!: string;
}
