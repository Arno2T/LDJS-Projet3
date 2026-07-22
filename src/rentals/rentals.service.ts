import { Injectable, NotFoundException } from '@nestjs/common';
import { RentalsRepository } from './rentals.repository';
import { RentalResponseDto } from './dto/rental-response.dto';
import { CreateRentalDto } from './dto/create-rental.dto';
import { UpdateRentalDto } from './dto/update-rental.dto';

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

  async findById(id: number): Promise<RentalResponseDto> {
    const rental = await this.rentalsRepository.findById(id);

    if (!rental) {
      throw new NotFoundException('Rental not found');
    }

    return {
      id: rental.id,
      name: rental.name,
      surface: Number(rental.surface),
      price: Number(rental.price),
      picture: rental.picture ?? null,
      description: rental.description,
      owner: rental.owner,
      created_at: rental.createdAt,
      updated_at: rental.updatedAt,
    };
  }

  async create(
    createRentalDto: CreateRentalDto,
    file: Express.Multer.File,
    ownerId: number,
  ): Promise<{ message: string }> {
    const pictureUrl = `http://localhost:3000/uploads/${file.filename}`;
    await this.rentalsRepository.create({
      ...createRentalDto,
      picture: pictureUrl,
      ownerId,
    });
    return { message: 'Rental created successfully !' };
  }

  async update(
    id: number,
    updateRentalDto: UpdateRentalDto,
    file: Express.Multer.File | undefined,
  ): Promise<{ message: string }> {
    const rental = await this.rentalsRepository.findById(id);

    if (!rental) {
      throw new NotFoundException('Rental not found');
    }

    const pictureUrl = file
      ? `http://localhost:3000/uploads/${file.filename}`
      : undefined;
    await this.rentalsRepository.update(id, {
      ...updateRentalDto,
      picture: pictureUrl,
    });
    return { message: 'Rental updated successfully !' };
  }
}
