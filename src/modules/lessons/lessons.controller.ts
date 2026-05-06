import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { LessonsService } from './lessons.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { Lesson } from './entities/lesson.entity';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from '../users/entities/user.entity';

@ApiTags('Lessons')
@ApiBearerAuth()
@Controller('lessons')
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) { }

  /**
   * Menambahkan materi (Lesson) baru ke dalam modul.
   */
  @Post()
  @Roles(UserRole.INSTRUCTOR, UserRole.ADMIN)
  @ApiOperation({ summary: 'Create a new lesson' })
  @ApiResponse({ status: 201, type: Lesson })
  create(@Body() createLessonDto: CreateLessonDto) {
    return this.lessonsService.create(createLessonDto);
  }

  /**
   * Mengambil daftar semua materi di seluruh sistem (Hanya Admin).
   */
  @Get()
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Get all lessons' })
  @ApiResponse({ status: 200, type: [Lesson] })
  findAll() {
    return this.lessonsService.findAll();
  }

  /**
   * Mengambil semua materi yang ada di dalam satu modul tertentu.
   */
  @Get('module/:moduleId')
  @ApiOperation({ summary: 'Get all lessons for a specific module' })
  @ApiResponse({ status: 200, type: [Lesson] })
  findByModule(@Param('moduleId', ParseUUIDPipe) moduleId: string) {
    return this.lessonsService.findByModule(moduleId);
  }

  /**
   * Mengambil detail materi (teks materi, link video, dll).
   */
  @Get(':id')
  @ApiOperation({ summary: 'Get a lesson by id' })
  @ApiResponse({ status: 200, type: Lesson })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.lessonsService.findOne(id);
  }

  /**
   * Memperbarui isi materi.
   */
  @Patch(':id')
  @Roles(UserRole.INSTRUCTOR, UserRole.ADMIN)
  @ApiOperation({ summary: 'Update a lesson' })
  @ApiResponse({ status: 200, type: Lesson })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateLessonDto: UpdateLessonDto) {
    return this.lessonsService.update(id, updateLessonDto);
  }

  /**
   * Menghapus materi.
   */
  @Delete(':id')
  @Roles(UserRole.INSTRUCTOR, UserRole.ADMIN)
  @ApiOperation({ summary: 'Delete a lesson' })
  @ApiResponse({ status: 204, description: 'Lesson successfully deleted.' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.lessonsService.remove(id);
  }
}
