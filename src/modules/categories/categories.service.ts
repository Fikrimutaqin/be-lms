import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { metadata } from 'reflect-metadata/no-conflict';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) { }

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
   * Mengambil 10 kategori terpopuler berdasarkan jumlah pendaftaran (enrollment).
   * Logic: Category -> Courses -> Enrollments (Count)
   */
  async topCategories() {
    const categories = await this.categoryRepository
      .createQueryBuilder('category')
      // Kita join manual ke tabel courses dan enrollments
      .leftJoin('courses', 'course', 'course.category_id = category.id')
      .leftJoin('enrollments', 'enrollment', 'enrollment.course_id = course.id')
      .select([
        'category.id AS id',
        'category.name AS name',
        'category.slug AS slug',
        'category.image AS image',
      ])
      // Menghitung total enrollment per kategori
      .addSelect('COUNT(enrollment.id)::INTEGER', 'courseSold')
      // Di PostgreSQL, semua kolom di SELECT harus masuk ke GROUP BY jika ada fungsi agregat
      .groupBy('category.id')
      .addGroupBy('category.name')
      .addGroupBy('category.slug')
      .addGroupBy('category.image')
      // Urutkan berdasarkan courseSold secara descending
      .orderBy('"courseSold"', 'DESC')
      // Hanya ambil kategori yang minimal memiliki 1 enrollment
      .having('COUNT(enrollment.id) > 0')
      .limit(10)
      .getRawMany();

    return {
      message: 'Top categories retrieved successfully',
      data: categories,
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

  /**
   * Menampilkan list kategori dan semua kursus yang ada di dalamnya.
   */
  async showListCategoriesWithCourse(query: PaginationQueryDto) {
    const { limit = 10, page = 1 } = query;
    const skip = (page - 1) * limit;

    const categories = await this.categoryRepository
      .createQueryBuilder('category')
      // Join manual ke tabel courses
      .leftJoin('courses', 'course', 'course.category_id = category.id')
      .select([
        'category.id AS id',
        'category.name AS name',
        'category.slug AS slug',
        'category.image AS image',
      ])
      // Mengumpulkan semua data kursus yang terkait ke dalam array JSON
      .addSelect(`
        COALESCE(
          json_agg(
            json_build_object(
              'id', course.id,
              'title', course.title,
              'description', course.description,
              'image', course.image,
              'banner', course.banner,
              'price', course.price,
              'instructorId', course.instructor_id,
              'createdAt', course.created_at
            )
          ) FILTER (WHERE course.id IS NOT NULL), 
          '[]'
        )
      `, 'courses')
      // Penting: GROUP BY semua kolom non-aggregate untuk PostgreSQL
      .groupBy('category.id')
      .addGroupBy('category.name')
      .addGroupBy('category.slug')
      .addGroupBy('category.image')
      .orderBy('category.name', 'ASC')
      .limit(limit)
      .offset(skip)
      .getRawMany();

    return {
      message: 'Categories with courses retrieved successfully',
      data: categories,
      metadata: {
        total: categories.length,
        limit: Number(limit),
        page: Number(page),
      }
    };
  }

  /**
   * Menampilkan semua kursus yang ada di dalam kategori tertentu berdasarkan ID Kategori.
   */
  async findCoursesByCategory(id: string, query: PaginationQueryDto) {
    const category = await this.findOne(id);
    const { page = 1, limit = 10 } = query;
    const skip = (page - 1) * limit;

    const [courses, totalItems] = await this.categoryRepository.manager
      .createQueryBuilder('courses', 'course')
      .leftJoinAndSelect('course.instructor', 'instructor')
      .where('course.category_id = :id', { id: category.id })
      .take(limit)
      .skip(skip)
      .getManyAndCount();

    return {
      message: `Courses for category '${category.name}' retrieved successfully`,
      data: courses,
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
