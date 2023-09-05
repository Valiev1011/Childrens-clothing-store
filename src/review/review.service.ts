import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';

import { Review } from './model/review.model';

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel(Review)
    private reviewRepository: typeof Review,
  ) {}

  async create(createReviewDto: CreateReviewDto): Promise<Review> {
    const review = await this.reviewRepository.create(createReviewDto);
    return review;
  }

  async findAll(): Promise<Review[]> {
    const reviews = await this.reviewRepository.findAll();
    return reviews;
  }

  async findOne(id: number): Promise<Review> {
    const review = await this.reviewRepository.findOne({
      where: { id },
    });
    return review;
  }

  async update(
    id: number,
    updateReviewDto: UpdateReviewDto,
  ): Promise<[number, Review[]]> {
    const updatedReviews = await this.reviewRepository.update(updateReviewDto, {
      where: { id },
      returning: true,
    });
    return updatedReviews;
  }

  async delete(id: number): Promise<number> {
    const deletedReviews = await this.reviewRepository.destroy({
      where: { id },
    });
    return deletedReviews;
  }
}
