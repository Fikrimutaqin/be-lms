import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { Public } from '../../common/decorators/public.decorator';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from '../users/entities/user.entity';

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) { }

  /**
   * Menambahkan kategori baru.
   * Hanya Admin yang boleh menambah kategori untuk menjaga konsistensi data.
   */
  @Post()
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Create a new category' })
  @ApiResponse({ status: 201, description: 'The category has been successfully created.', type: Category })
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.create(createCategoryDto);
  }

  /**
   * Mengambil semua kategori (Public).
   * Siswa atau pengunjung tidak perlu login untuk melihat daftar kategori.
   */
  @Get()
  @Public()
  @ApiOperation({ summary: 'Get all categories' })
  @ApiResponse({ status: 200, description: 'Return all categories.' })
  findAll(@Query() query: PaginationQueryDto) {
    return this.categoriesService.findAll(query);
  }

  /**
   * Mengambil semua kategori dan jumlah kursus di dalamnya.
   */
  @Public()
  @Get('with-courses')
  @ApiOperation({ summary: 'Get all categories with course' })
  @ApiResponse({ status: 200, description: 'Return all categories with course.' })
  showListCategoriesWithCourse(@Query() query: PaginationQueryDto) {
    return this.categoriesService.showListCategoriesWithCourse(query);
  }

  /**
   * Mengambil Top 10 kategori berdasarkan jumlah kursus yang terjual.
   * Digunakan untuk bagian "Trending" atau "Popular" di frontend.
   */
  @Public()
  @Get('top')
  @ApiOperation({ summary: 'Get top 10 categories' })
  @ApiResponse({ status: 200, description: 'Return top 10 categories.', type: [Category] })
  async getTopCategories() {
    return await this.categoriesService.topCategories();
  }

  /**
   * Mengambil detail kategori berdasarkan ID.
   */
  @Get(':id')
  @ApiOperation({ summary: 'Get a category by id' })
  @ApiResponse({ status: 200, description: 'Return a category.', type: Category })
  @ApiResponse({ status: 404, description: 'Category not found.' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.categoriesService.findOne(id);
  }

  /**
   * Mengambil daftar kursus yang ada di dalam kategori tertentu.
   */
  @Public()
  @Get(':id/courses')
  @ApiOperation({ summary: 'Get courses by category id' })
  @ApiResponse({ status: 200, description: 'Return all courses in this category.' })
  findCoursesByCategory(
    @Param('id', ParseUUIDPipe) id: string,
    @Query() query: PaginationQueryDto,
  ) {
    return this.categoriesService.findCoursesByCategory(id, query);
  }

  /**
   * Mengupdate nama atau data kategori. (Hanya Admin)
   */
  @Patch(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Update a category' })
  @ApiResponse({ status: 200, description: 'The category has been successfully updated.', type: Category })
  @ApiResponse({ status: 404, description: 'Category not found.' })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoriesService.update(id, updateCategoryDto);
  }

  /**
   * Menghapus kategori. (Hanya Admin)
   */
  @Delete(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Delete a category' })
  @ApiResponse({ status: 204, description: 'The category has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Category not found.' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.categoriesService.remove(id);
  }
}
