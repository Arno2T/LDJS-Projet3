import { Injectable } from '@nestjs/common';
import { RentalsRepository } from './rentals.repository';
import { RentalResponseDto } from './dto/rental-response.dto';

@Injectable()
export class RentalsService {
  constructor(private readonly rentalsRepository: RentalsRepository) {}

  async findAll(): Promise<{ rentals: RentalResponseDto[] }> {
    const rentals = await this.rentalsRepository.findAll();

    return {
      rentals: rentals.map((rental) => ({
        id: rental.id,
        name: rental.name,
        surface: Number(rental.surface),
        price: Number(rental.price),
        picture: rental.picture ?? null,
        description: rental.description,
        owner: rental.owner,
        created_at: rental.createdAt,
        updated_at: rental.updatedAt,
      })),
    };
  }
}
