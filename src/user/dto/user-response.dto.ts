import { ApiProperty } from '@nestjs/swagger';

export class UserResponseDto {
  @ApiProperty({ example: 1 })
  id!: number;

  @ApiProperty({ example: 'Juste LeBlanc' })
  name!: string;

  @ApiProperty({ example: 'juste.leblanc@gmail.com' })
  email!: string;

  @ApiProperty({ example: '2026-01-01T00:00:00.000Z' })
  created_at!: Date;

  @ApiProperty({ example: '2026-01-01T00:00:00.000Z' })
  updated_at!: Date;
}
