import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { QuizQuestionsService } from './quiz-questions.service';
import { CreateQuizQuestionDto } from './dto/create-quiz-question.dto';
import { UpdateQuizQuestionDto } from './dto/update-quiz-question.dto';
import { QuizQuestion } from './entities/quiz-question.entity';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from '../users/entities/user.entity';

@ApiTags('Quiz Questions')
@ApiBearerAuth()
@Controller('quiz-questions')
export class QuizQuestionsController {
  constructor(private readonly quizQuestionsService: QuizQuestionsService) { }

  /**
   * Menambahkan pertanyaan baru ke dalam kuis.
   * Hanya Instruktur atau Admin.
   */
  @Post()
  @Roles(UserRole.INSTRUCTOR, UserRole.ADMIN)
  @ApiOperation({ summary: 'Create a new quiz question' })
  @ApiResponse({ status: 201, type: QuizQuestion })
  create(@Body() createQuizQuestionDto: CreateQuizQuestionDto) {
    return this.quizQuestionsService.create(createQuizQuestionDto);
  }

  /**
   * Mengambil semua daftar pertanyaan di sistem (Hanya Admin).
   */
  @Get()
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Get all quiz questions' })
  @ApiResponse({ status: 200, type: [QuizQuestion] })
  findAll() {
    return this.quizQuestionsService.findAll();
  }

  /**
   * Mengambil semua pertanyaan yang ada di dalam satu kuis tertentu.
   */
  @Get('quiz/:quizId')
  @ApiOperation({ summary: 'Get all questions for a specific quiz' })
  @ApiResponse({ status: 200, type: [QuizQuestion] })
  findByQuiz(@Param('quizId', ParseUUIDPipe) quizId: string) {
    return this.quizQuestionsService.findByQuiz(quizId);
  }

  /**
   * Mengambil detail satu pertanyaan kuis.
   */
  @Get(':id')
  @ApiOperation({ summary: 'Get a quiz question by id' })
  @ApiResponse({ status: 200, type: QuizQuestion })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.quizQuestionsService.findOne(id);
  }

  /**
   * Memperbarui isi pertanyaan.
   */
  @Patch(':id')
  @Roles(UserRole.INSTRUCTOR, UserRole.ADMIN)
  @ApiOperation({ summary: 'Update a quiz question' })
  @ApiResponse({ status: 200, type: QuizQuestion })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateQuizQuestionDto: UpdateQuizQuestionDto) {
    return this.quizQuestionsService.update(id, updateQuizQuestionDto);
  }

  /**
   * Menghapus pertanyaan kuis.
   */
  @Delete(':id')
  @Roles(UserRole.INSTRUCTOR, UserRole.ADMIN)
  @ApiOperation({ summary: 'Delete a quiz question' })
  @ApiResponse({ status: 204, description: 'Question successfully deleted.' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.quizQuestionsService.remove(id);
  }
}
