import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SearchService } from './search.service';
import { SearchController } from './search.controller';
import { Course } from '../courses/entities/course.entity';
import { Category } from '../categories/entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Course, Category])],
  controllers: [SearchController],
  providers: [SearchService],
})
export class SearchModule { }
