import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Course } from '../courses/entities/course.entity';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';

@Injectable()
export class SearchService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
  ) { }

  async search(query: string, paginationQuery: PaginationQueryDto) {
    if (!query) {
      return {
        message: 'Search results retrieved successfully',
        data: {
          courses: [],
        },
        meta: {
          totalItems: 0,
          itemCount: 0,
          itemsPerPage: paginationQuery.limit || 10,
          totalPages: 0,
          currentPage: paginationQuery.page || 1,
        }
      };
    }

    const { page = 1, limit = 10 } = paginationQuery;
    const skip = (page - 1) * limit;
    const flexibleQuery = query.replace(/\s+/g, '%');

    const [courses, totalItems] = await this.courseRepository.createQueryBuilder('course')
      .leftJoinAndSelect('course.category', 'category')
      .leftJoinAndSelect('course.instructor', 'instructor')
      .where('course.title ILIKE :query OR course.description ILIKE :query OR category.name ILIKE :query', { query: `%${flexibleQuery}%` })
      .andWhere('course.status = :status', { status: 'published' })
      .orderBy('course.createdAt', 'DESC')
      .skip(skip)
      .take(limit)
      .getManyAndCount();

    // Menghilangkan field ID yang redundan dan data sensitif
    courses.forEach(course => {
      delete (course as any).categoryId;
      delete (course as any).instructorId;

      if (course.instructor) {
        delete (course.instructor as any).email;
        delete (course.instructor as any).password;
        delete (course.instructor as any).role;
      }
    });

    return {
      message: 'Search results retrieved successfully',
      data: {
        courses,
      },
      meta: {
        totalItems,
        itemCount: courses.length,
        itemsPerPage: Number(limit),
        totalPages: Math.ceil(totalItems / limit),
        currentPage: Number(page),
      },
    };
  }
}
