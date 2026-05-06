import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { QuizzesService } from './quizzes.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { Quiz } from './entities/quiz.entity';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from '../users/entities/user.entity';

@ApiTags('Quizzes')
@ApiBearerAuth()
@Controller('quizzes')
export class QuizzesController {
  constructor(private readonly quizzesService: QuizzesService) { }

  /**
   * Membuat kuis baru untuk kursus.
   * Hanya Instruktur atau Admin.
   */
  @Post()
  @Roles(UserRole.INSTRUCTOR, UserRole.ADMIN)
  @ApiOperation({ summary: 'Create a new quiz' })
  @ApiResponse({ status: 201, type: Quiz })
  create(@Body() createQuizDto: CreateQuizDto) {
    return this.quizzesService.create(createQuizDto);
  }

  /**
   * Mengambil semua daftar kuis (Hanya Admin).
   */
  @Get()
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Get all quizzes' })
  @ApiResponse({ status: 200, type: [Quiz] })
  findAll() {
    return this.quizzesService.findAll();
  }

  /**
   * Mengambil semua kuis yang tersedia dalam satu kursus tertentu.
   */
  @Get('course/:courseId')
  @ApiOperation({ summary: 'Get all quizzes for a specific course' })
  @ApiResponse({ status: 200, type: [Quiz] })
  findByCourse(@Param('courseId', ParseUUIDPipe) courseId: string) {
    return this.quizzesService.findByCourse(courseId);
  }

  /**
   * Mengambil detail kuis berdasarkan ID.
   */
  @Get(':id')
  @ApiOperation({ summary: 'Get a quiz by id' })
  @ApiResponse({ status: 200, type: Quiz })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.quizzesService.findOne(id);
  }

  /**
   * Memperbarui pengaturan kuis (misal: nilai kelulusan atau durasi).
   */
  @Patch(':id')
  @Roles(UserRole.INSTRUCTOR, UserRole.ADMIN)
  @ApiOperation({ summary: 'Update a quiz' })
  @ApiResponse({ status: 200, type: Quiz })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateQuizDto: UpdateQuizDto) {
    return this.quizzesService.update(id, updateQuizDto);
  }

  /**
   * Menghapus kuis.
   */
  @Delete(':id')
  @Roles(UserRole.INSTRUCTOR, UserRole.ADMIN)
  @ApiOperation({ summary: 'Delete a quiz' })
  @ApiResponse({ status: 204, description: 'Quiz successfully deleted.' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.quizzesService.remove(id);
  }
}
