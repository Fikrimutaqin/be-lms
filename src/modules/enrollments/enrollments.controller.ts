import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Query, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { EnrollmentsService } from './enrollments.service';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { UpdateEnrollmentDto } from './dto/update-enrollment.dto';
import { Enrollment } from './entities/enrollment.entity';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from '../users/entities/user.entity';
import type { Request } from 'express';

@ApiTags('Enrollments')
@ApiBearerAuth()
@Controller('enrollments')
export class EnrollmentsController {
  constructor(private readonly enrollmentsService: EnrollmentsService) { }

  /**
   * Mengambil statistik kemajuan belajar siswa (progres kursus).
   */
  @Get('user/:userId/progress')
  @ApiOperation({ summary: 'Get progress for a specific user across all courses' })
  @ApiResponse({ status: 200, description: 'Return student progress stats.' })
  getStudentProgress(@Param('userId', ParseUUIDPipe) userId: string) {
    return this.enrollmentsService.getStudentProgress(userId);
  }

  /**
   * Mengambil statistik kemajuan seluruh siswa dalam satu kursus tertentu.
   */
  @Get('course/:courseId/progress')
  @ApiOperation({ summary: 'Get progress for all students in a specific course' })
  @ApiResponse({ status: 200, description: 'Return course-wide student progress stats.' })
  getCourseProgress(@Param('courseId', ParseUUIDPipe) courseId: string) {
    return this.enrollmentsService.getCourseProgress(courseId);
  }

  /**
   * Mendaftarkan diri ke sebuah kursus.
   * User ID diambil otomatis dari token JWT.
   */
  @Post()
  @ApiOperation({ summary: 'Enroll a user in a course' })
  @ApiResponse({ status: 201, description: 'User successfully enrolled.', type: Enrollment })
  create(@Body() createEnrollmentDto: CreateEnrollmentDto, @Req() req: Request) {
    return this.enrollmentsService.create(createEnrollmentDto, req.user);
  }

  /**
   * Mengambil semua daftar pendaftaran (Hanya Admin).
   */
  @Get()
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Get all enrollments' })
  @ApiResponse({ status: 200 })
  findAll(@Query() query: PaginationQueryDto) {
    return this.enrollmentsService.findAll(query);
  }

  /**
   * Mengambil daftar kursus yang diikuti oleh user tertentu.
   */
  @Get('user/:userId')
  @ApiOperation({ summary: 'Get enrollments for a specific user' })
  @ApiResponse({ status: 200 })
  findByUser(@Param('userId', ParseUUIDPipe) userId: string) {
    return this.enrollmentsService.findByUser(userId);
  }

  /**
   * Mencari detail pendaftaran berdasarkan ID.
   */
  @Get(':id')
  @ApiOperation({ summary: 'Get enrollment by id' })
  @ApiResponse({ status: 200, type: Enrollment })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.enrollmentsService.findOne(id);
  }

  /**
   * Mengupdate status pendaftaran (misal: dari Active ke Completed).
   */
  @Patch(':id')
  @ApiOperation({ summary: 'Update enrollment status' })
  @ApiResponse({ status: 200, type: Enrollment })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateEnrollmentDto: UpdateEnrollmentDto) {
    return this.enrollmentsService.update(id, updateEnrollmentDto);
  }

  /**
   * Menghapus pendaftaran (Unenroll).
   */
  @Delete(':id')
  @ApiOperation({ summary: 'Remove an enrollment' })
  @ApiResponse({ status: 204, description: 'Enrollment removed.' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.enrollmentsService.remove(id);
  }
}
