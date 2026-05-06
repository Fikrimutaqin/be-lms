import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { GradesService } from './grades.service';
import { CreateGradeDto } from './dto/create-grade.dto';
import { UpdateGradeDto } from './dto/update-grade.dto';
import { Grade } from './entities/grade.entity';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserRole } from '../users/entities/user.entity';

@ApiTags('Grades')
@ApiBearerAuth()
@Controller('grades')
export class GradesController {
  constructor(private readonly gradesService: GradesService) { }

  /**
   * Memberikan nilai kepada siswa.
   * Hanya Instruktur atau Admin yang diizinkan.
   */
  @Post()
  @Roles(UserRole.INSTRUCTOR, UserRole.ADMIN)
  @ApiOperation({ summary: 'Create a new grade' })
  @ApiResponse({ status: 201, type: Grade })
  create(@Body() createGradeDto: CreateGradeDto) {
    return this.gradesService.create(createGradeDto);
  }

  /**
   * Mengambil semua daftar nilai (Hanya Admin).
   */
  @Get()
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Get all grades' })
  @ApiResponse({ status: 200, type: [Grade] })
  findAll() {
    return this.gradesService.findAll();
  }

  /**
   * Mengambil semua nilai milik user tertentu (Rapor Siswa).
   */
  @Get('user/:userId')
  @ApiOperation({ summary: 'Get all grades for a specific user' })
  @ApiResponse({ status: 200, type: [Grade] })
  findByUser(@Param('userId', ParseUUIDPipe) userId: string) {
    return this.gradesService.findByUser(userId);
  }

  /**
   * Mengambil detail satu nilai.
   */
  @Get(':id')
  @ApiOperation({ summary: 'Get a grade by id' })
  @ApiResponse({ status: 200, type: Grade })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.gradesService.findOne(id);
  }

  /**
   * Memperbarui nilai (misal: revisi nilai setelah protes).
   */
  @Patch(':id')
  @Roles(UserRole.INSTRUCTOR, UserRole.ADMIN)
  @ApiOperation({ summary: 'Update a grade' })
  @ApiResponse({ status: 200, type: Grade })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateGradeDto: UpdateGradeDto) {
    return this.gradesService.update(id, updateGradeDto);
  }

  /**
   * Menghapus data nilai.
   */
  @Delete(':id')
  @Roles(UserRole.INSTRUCTOR, UserRole.ADMIN)
  @ApiOperation({ summary: 'Delete a grade' })
  @ApiResponse({ status: 204, description: 'Grade successfully deleted.' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.gradesService.remove(id);
  }
}
