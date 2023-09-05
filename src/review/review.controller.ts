import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'; // Import necessary decorators

@ApiTags('Review')
@Controller('review')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @ApiOperation({ summary: 'Create a new review' }) // Add this annotation
  @Post()
  create(@Body() createReviewDto: CreateReviewDto) {
    return this.reviewService.create(createReviewDto);
  }

  @ApiOperation({ summary: 'Get all reviews' }) // Add this annotation
  @Get()
  findAll() {
    return this.reviewService.findAll();
  }

  @ApiOperation({ summary: 'Get a review by ID' }) // Add this annotation
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.reviewService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update a review by ID' }) // Add this annotation
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto) {
    return this.reviewService.update(+id, updateReviewDto);
  }

  @ApiOperation({ summary: 'Delete a review by ID' }) // Add this annotation
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reviewService.delete(+id);
  }
}
