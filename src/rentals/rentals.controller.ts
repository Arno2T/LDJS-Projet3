import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Param,
  Request,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage, StorageEngine } from 'multer';
import { extname } from 'path';
import { RentalsService } from './rentals.service';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiConsumes,
  ApiBody,
} from '@nestjs/swagger';
import {
  RentalsListResponseDto,
  RentalResponseDto,
} from './dto/rental-response.dto';
import { CreateRentalDto } from './dto/create-rental.dto';
import { UpdateRentalDto } from './dto/update-rental.dto';

const multerStorage: StorageEngine = diskStorage({
  destination: './uploads',
  filename: (
    req: Express.Request,
    file: Express.Multer.File,
    cb: (error: null, filename: string) => void,
  ) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;

    cb(null, uniqueSuffix + extname(file.originalname));
  },
});

@ApiTags('Rentals')
@ApiBearerAuth()
@Controller('api/rentals')
export class RentalsController {
  constructor(private readonly rentalsService: RentalsService) {}

  @Get()
  @ApiOperation({ summary: 'Get all rentals' })
  @ApiResponse({
    status: 200,
    description: 'Return all rentals.',
    type: RentalsListResponseDto,
  })
  findAll() {
    return this.rentalsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get one rental by id' })
  @ApiResponse({
    status: 200,
    description: 'Return one rental by id.',
    type: RentalResponseDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Rental not found.',
  })
  findOne(@Param('id') id: string) {
    return this.rentalsService.findById(+id);
  }

  @Post()
  @ApiOperation({ summary: 'Create a rental' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'Appartement Paris' },
        surface: { type: 'number', example: 50 },
        price: { type: 'number', example: 1200 },
        description: { type: 'string', example: 'Bel appartement' },
        picture: { type: 'string', format: 'binary' },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'The rental has been successfully created.',
    type: RentalResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request.',
  })
  @UseInterceptors(
    FileInterceptor('picture', {
      storage: multerStorage,
    }),
  )
  create(
    @Body() createRentalDto: CreateRentalDto,
    @UploadedFile() file: Express.Multer.File,
    @Request() req: { user: { id: number } },
  ) {
    return this.rentalsService.create(createRentalDto, file, req.user.id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a rental' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string', example: 'Appartement Paris' },
        surface: { type: 'number', example: 50 },
        price: { type: 'number', example: 1200 },
        description: { type: 'string', example: 'Bel appartement' },
        picture: { type: 'string', format: 'binary' },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'The rental has been successfully updated.',
    type: RentalResponseDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request.',
  })
  @ApiResponse({
    status: 404,
    description: 'Rental not found.',
  })
  @UseInterceptors(
    FileInterceptor('picture', {
      storage: multerStorage,
    }),
  )
  update(
    @Param('id') id: string,
    @Body() updateRentalDto: UpdateRentalDto,
    @UploadedFile() file: Express.Multer.File | undefined,
  ) {
    return this.rentalsService.update(+id, updateRentalDto, file);
  }
}
