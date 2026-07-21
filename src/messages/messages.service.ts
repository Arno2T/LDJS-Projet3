import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateMessageDto } from './dto/create-message.dto';

@Injectable()
export class MessagesService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(messageDto: CreateMessageDto): Promise<{ message: string }> {
    await this.prismaService.message.create({
      data: {
        message: messageDto.message,
        rentalId: messageDto.rental_id,
        userId: messageDto.user_id,
      },
    });

    return { message: 'Message created successfully !' };
  }
}
