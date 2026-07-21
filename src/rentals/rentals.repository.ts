import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateRentalDto } from './dto/create-rental.dto';

@Injectable()
export class RentalsRepository {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.rental.findMany({
      include: {
        owner: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  findById(id: number) {
    return this.prisma.rental.findUnique({
      where: { id },
      include: {
        owner: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  create(data: CreateRentalDto & { picture: string; ownerId: number }) {
    return this.prisma.rental.create({
      data: {
        name: data.name,
        surface: data.surface,
        price: data.price,
        description: data.description,
        picture: data.picture,
        ownerId: data.ownerId,
      },
    });
  }
}
