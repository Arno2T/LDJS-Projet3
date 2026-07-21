import { ApiProperty } from '@nestjs/swagger';

export class RentalOwnerDto {
  @ApiProperty({ example: 1 })
  id!: number;

  @ApiProperty({ example: 'Juste LeBlanc' })
  name!: string;
}

export class RentalResponseDto {
  @ApiProperty({ example: 1 })
  id!: number;

  @ApiProperty({ example: 'Appartement Paris' })
  name!: string;

  @ApiProperty({ example: 50 })
  surface!: number;

  @ApiProperty({ example: 1000 })
  price!: number;

  @ApiProperty({ example: 'picture.jpg' })
  picture!: string | null;

  @ApiProperty({ example: 'Beautiful place' })
  description!: string;

  @ApiProperty({ type: RentalOwnerDto })
  owner!: RentalOwnerDto;

  @ApiProperty({ example: '2026-01-01T00:00:00.000Z' })
  created_at!: Date;

  @ApiProperty({ example: '2026-05-01T00:00:00.000Z' })
  updated_at!: Date;
}

export class RentalsListResponseDto {
  @ApiProperty({ type: [RentalResponseDto] })
  rentals!: RentalResponseDto[];
}
