import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CourseModulesService } from './course-modules.service';
import { CreateCourseModuleDto } from './dto/create-course-module.dto';
import { UpdateCourseModuleDto } from './dto/update-course-module.dto';
import { CourseModule } from './entities/course-module.entity';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from '../users/entities/user.entity';

@ApiTags('Course Modules')
@ApiBearerAuth()
@Controller('course-modules')
export class CourseModulesController {
  constructor(private readonly courseModulesService: CourseModulesService) { }

  /**
   * Membuat modul baru untuk sebuah kursus.
   * Hanya Instruktur atau Admin yang diizinkan.
   */
  @Post()
  @Roles(UserRole.INSTRUCTOR, UserRole.ADMIN)
  @ApiOperation({ summary: 'Create a new module for a course' })
  @ApiResponse({ status: 201, type: CourseModule })
  create(@Body() createCourseModuleDto: CreateCourseModuleDto) {
    return this.courseModulesService.create(createCourseModuleDto);
  }

  /**
   * Mengambil semua modul yang ada di sistem (Hanya Admin).
   */
  @Get()
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Get all modules' })
  @ApiResponse({ status: 200, type: [CourseModule] })
  findAll() {
    return this.courseModulesService.findAll();
  }

  /**
   * Mengambil semua modul yang menjadi bagian dari satu kursus tertentu.
   * Biasanya digunakan saat menampilkan daftar kurikulum kursus.
   */
  @Get('course/:courseId')
  @ApiOperation({ summary: 'Get all modules for a specific course' })
  @ApiResponse({ status: 200, type: [CourseModule] })
  findByCourse(@Param('courseId', ParseUUIDPipe) courseId: string) {
    return this.courseModulesService.findByCourse(courseId);
  }

  /**
   * Mengambil detail satu modul berdasarkan ID.
   */
  @Get(':id')
  @ApiOperation({ summary: 'Get a module by id' })
  @ApiResponse({ status: 200, type: CourseModule })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.courseModulesService.findOne(id);
  }

  /**
   * Memperbarui data modul (misal: judul atau urutan).
   */
  @Patch(':id')
  @Roles(UserRole.INSTRUCTOR, UserRole.ADMIN)
  @ApiOperation({ summary: 'Update a module' })
  @ApiResponse({ status: 200, type: CourseModule })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateCourseModuleDto: UpdateCourseModuleDto) {
    return this.courseModulesService.update(id, updateCourseModuleDto);
  }

  /**
   * Menghapus modul.
   */
  @Delete(':id')
  @Roles(UserRole.INSTRUCTOR, UserRole.ADMIN)
  @ApiOperation({ summary: 'Delete a module' })
  @ApiResponse({ status: 204, description: 'Module successfully deleted.' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.courseModulesService.remove(id);
  }
}
