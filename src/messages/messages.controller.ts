import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBody,
} from '@nestjs/swagger';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';

@ApiTags('Messages')
@ApiBearerAuth()
@Controller('api/messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new message' })
  @ApiBody({
    type: CreateMessageDto,
    description: 'Message to send',
  })
  @ApiResponse({
    status: 201,
    description: 'The message has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  async create(@Body() messageDto: CreateMessageDto) {
    return this.messagesService.create(messageDto);
  }
}
