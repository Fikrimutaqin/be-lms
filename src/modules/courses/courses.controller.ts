import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query, Req } from '@nestjs/common';
import type { Request } from 'express';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { CourseQueryDto } from './dto/course-query.dto';
import { Course } from './entities/course.entity';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from '../users/entities/user.entity';
import { Public } from '../../common/decorators/public.decorator';

@ApiTags('Courses')
@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) { }

  /**
   * Mengambil statistik performa kursus (jumlah siswa, skor rata-rata, dll).
   * Biasanya digunakan untuk dashboard instruktur atau admin.
   */
  @Get('stats')
  @ApiOperation({ summary: 'Get course enrollment and score statistics' })
  @ApiResponse({ status: 200, description: 'Return course statistics.' })
  getStats() {
    return this.coursesService.getStats();
  }

  /**
   * Membuat kursus baru.
   * Hanya boleh dilakukan oleh Instruktur atau Admin.
   * ID Instruktur akan otomatis diambil dari token JWT (tidak perlu kirim ID di body).
   */
  @Post()
  @Roles(UserRole.INSTRUCTOR, UserRole.ADMIN)
  @ApiOperation({ summary: 'Create a new course' })
  @ApiResponse({ status: 201, description: 'The course has been successfully created.', type: Course })
  create(@Body() createCourseDto: CreateCourseDto, @Req() req: Request) {
    return this.coursesService.create(createCourseDto, req.user);
  }

  /**
   * Mengambil semua daftar kursus dengan sistem pagination.
   * Mendukung query parameter ?page=1&limit=10 & categoryId=...
   */
  @Public()
  @Get()
  @ApiOperation({ summary: 'Get all courses' })
  @ApiResponse({ status: 200, description: 'Return all courses.' })
  findAll(@Query() query: CourseQueryDto) {
    return this.coursesService.findAll(query);
  }

  /**
   * Mencari detail satu kursus berdasarkan ID-nya.
   */
  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Get a course by id' })
  @ApiResponse({ status: 200, description: 'Return a course.', type: Course })
  @ApiResponse({ status: 404, description: 'Course not found.' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.coursesService.findOne(id);
  }

  /**
   * Memperbarui data kursus.
   * Ada pengecekan Ownership: Instruktur hanya bisa mengedit kursus miliknya sendiri.
   */
  @Patch(':id')
  @Roles(UserRole.INSTRUCTOR, UserRole.ADMIN)
  @ApiOperation({ summary: 'Update a course' })
  @ApiResponse({ status: 200, description: 'The course has been successfully updated.', type: Course })
  @ApiResponse({ status: 404, description: 'Course not found.' })
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateCourseDto: UpdateCourseDto,
    @Req() req: Request
  ) {
    return this.coursesService.update(id, updateCourseDto, req.user);
  }

  /**
   * Menghapus kursus.
   * Ada pengecekan Ownership: Hanya pemilik atau Admin yang bisa menghapus.
   */
  @Delete(':id')
  @Roles(UserRole.INSTRUCTOR, UserRole.ADMIN)
  @ApiOperation({ summary: 'Delete a course' })
  @ApiResponse({ status: 204, description: 'The course has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Course not found.' })
  remove(@Param('id', ParseUUIDPipe) id: string, @Req() req: Request) {
    return this.coursesService.remove(id, req.user);
  }
}
