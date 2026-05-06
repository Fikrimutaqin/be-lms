import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  /**
   * Menambahkan kategori baru.
   * Cek apakah nama atau slug sudah ada untuk menghindari duplikasi.
   */
  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const existing = await this.categoryRepository.findOne({
      where: [
        { name: createCategoryDto.name },
        { slug: createCategoryDto.slug }
      ]
    });

    if (existing) {
      throw new ConflictException('Category with this name or slug already exists');
    }

    const category = this.categoryRepository.create(createCategoryDto);
    return await this.categoryRepository.save(category);
  }

  /**
   * Mengambil semua kategori dengan pagination.
   */
  async findAll(query: PaginationQueryDto) {
    const { page = 1, limit = 10 } = query;
    const skip = (page - 1) * limit;

    const [items, totalItems] = await this.categoryRepository.findAndCount({
      take: limit,
      skip: skip,
      order: { name: 'ASC' }, // Urutkan alfabetis
    });

    const totalPages = Math.ceil(totalItems / limit);

    return {
      message: 'Categories retrieved successfully',
      data: items,
      meta: {
        totalItems,
        itemCount: items.length,
        itemsPerPage: Number(limit),
        totalPages,
        currentPage: Number(page),
      },
    };
  }

  /**
   * Logika kompleks untuk mencari Kategori Terpopuler.
   * Menghitung total pendaftaran (enrollment) di semua kursus dalam setiap kategori.
   */
  async topCategories() {
    const categories = await this.categoryRepository
      .createQueryBuilder('category')
      .leftJoin('courses', 'course', 'course.category = category.slug')
      .leftJoin('enrollments', 'enrollment', 'enrollment.course_id = course.id')
      .select([
        'category.id AS id',
        'category.name AS name',
        'category.slug AS slug',
        'category.image AS image',
      ])
      // Cast ke integer agar hasil COUNT tidak menjadi string di JSON response
      .addSelect('CAST(COUNT(enrollment.id) AS INTEGER)', 'courseSold')
      .groupBy('category.id')
      .orderBy('COUNT(enrollment.id)', 'DESC') // Urutkan dari yang paling banyak terjual
      .having('COUNT(enrollment.id) > 0') // Sembunyikan kategori yang penjualannya masih 0
      .limit(10)
      .getRawMany();

    return {
      message: 'Top categories retrieved successfully',
      data: categories
    };
  }

  /**
   * Mencari detail satu kategori.
   */
  async findOne(id: string): Promise<Category> {
    const category = await this.categoryRepository.findOne({ where: { id } });
    if (!category) {
      throw new NotFoundException(`Category with ID "${id}" not found`);
    }
    return category;
  }

  /**
   * Mengupdate kategori.
   */
  async update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
    const category = await this.findOne(id);
    const updatedCategory = this.categoryRepository.merge(category, updateCategoryDto);
    return await this.categoryRepository.save(updatedCategory);
  }

  /**
   * Menghapus kategori.
   */
  async remove(id: string): Promise<void> {
    const category = await this.findOne(id);
    await this.categoryRepository.remove(category);
  }
}
