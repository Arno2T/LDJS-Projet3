import { Controller, Get } from '@nestjs/common';
import { RentalsService } from './rentals.service';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { RentalsListResponseDto } from './dto/rental-response.dto';

@ApiTags('Rentals')
@Controller('api/rentals')
export class RentalsController {
  constructor(private readonly rentalsService: RentalsService) {}

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all rentals' })
  @ApiResponse({
    status: 200,
    description: 'Return all rentals.',
    type: RentalsListResponseDto,
  })
  findAll() {
    return this.rentalsService.findAll();
  }
}
