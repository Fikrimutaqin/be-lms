import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Testimony } from './entities/testimony.entity';
import { CreateTestimonyDto } from './dto/create-testimony.dto';
import { UpdateTestimonyDto } from './dto/update-testimony.dto';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';

@Injectable()
export class TestimoniesService {
  constructor(
    @InjectRepository(Testimony)
    private readonly testimonyRepository: Repository<Testimony>,
  ) { }

  async create(createTestimonyDto: CreateTestimonyDto) {
    const testimony = this.testimonyRepository.create(createTestimonyDto);
    return await this.testimonyRepository.save(testimony);
  }

  async findAll(paginationQuery: PaginationQueryDto) {
    const { limit = 10, page = 1 } = paginationQuery;
    const skip = (page - 1) * limit;

    const [items, totalItems] = await this.testimonyRepository.findAndCount({
      where: { status: 'approved' },
      select: {
        id: true,
        name: true,
        avatar: true,
        content: true,
        rating: true,
        createdAt: true,
      },
      order: { createdAt: 'DESC' },
      take: limit,
      skip: skip,
    });

    return {
      data: items,
      meta: {
        totalItems,
        itemCount: items.length,
        itemsPerPage: limit,
        totalPages: Math.ceil(totalItems / limit),
        currentPage: page,
      },
    };
  }

  async findOne(id: string) {
    const testimony = await this.testimonyRepository.findOne({
      where: { id },
      relations: ['user', 'course'],
    });
    if (!testimony) {
      throw new NotFoundException(`Testimony with ID ${id} not found`);
    }
    return testimony;
  }

  async update(id: string, updateTestimonyDto: UpdateTestimonyDto) {
    const testimony = await this.findOne(id);
    Object.assign(testimony, updateTestimonyDto);
    return await this.testimonyRepository.save(testimony);
  }

  async remove(id: string) {
    const testimony = await this.findOne(id);
    return await this.testimonyRepository.remove(testimony);
  }
}
