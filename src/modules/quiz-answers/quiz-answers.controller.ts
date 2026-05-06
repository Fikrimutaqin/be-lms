import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { QuizAnswersService } from './quiz-answers.service';
import { CreateQuizAnswerDto } from './dto/create-quiz-answer.dto';
import { UpdateQuizAnswerDto } from './dto/update-quiz-answer.dto';
import { QuizAnswer } from './entities/quiz-answer.entity';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from '../users/entities/user.entity';

@ApiTags('Quiz Answers')
@ApiBearerAuth()
@Controller('quiz-answers')
export class QuizAnswersController {
  constructor(private readonly quizAnswersService: QuizAnswersService) { }

  /**
   * Menambahkan pilihan jawaban untuk sebuah pertanyaan.
   * Hanya Instruktur atau Admin.
   */
  @Post()
  @Roles(UserRole.INSTRUCTOR, UserRole.ADMIN)
  @ApiOperation({ summary: 'Create a quiz answer option' })
  @ApiResponse({ status: 201, type: QuizAnswer })
  create(@Body() createQuizAnswerDto: CreateQuizAnswerDto) {
    return this.quizAnswersService.create(createQuizAnswerDto);
  }

  /**
   * Mengambil semua daftar jawaban di sistem.
   */
  @Get()
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Get all quiz answers' })
  @ApiResponse({ status: 200, type: [QuizAnswer] })
  findAll() {
    return this.quizAnswersService.findAll();
  }

  /**
   * Mengambil semua pilihan jawaban untuk satu pertanyaan tertentu.
   */
  @Get('question/:questionId')
  @ApiOperation({ summary: 'Get answers for a specific question' })
  @ApiResponse({ status: 200, type: [QuizAnswer] })
  findByQuestion(@Param('questionId', ParseUUIDPipe) questionId: string) {
    return this.quizAnswersService.findByQuestion(questionId);
  }

  /**
   * Mengambil detail satu jawaban kuis.
   */
  @Get(':id')
  @ApiOperation({ summary: 'Get a quiz answer by id' })
  @ApiResponse({ status: 200, type: QuizAnswer })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.quizAnswersService.findOne(id);
  }

  /**
   * Memperbarui data jawaban (misal: mengganti teks atau status benar/salah).
   */
  @Patch(':id')
  @Roles(UserRole.INSTRUCTOR, UserRole.ADMIN)
  @ApiOperation({ summary: 'Update a quiz answer' })
  @ApiResponse({ status: 200, type: QuizAnswer })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateQuizAnswerDto: UpdateQuizAnswerDto) {
    return this.quizAnswersService.update(id, updateQuizAnswerDto);
  }

  /**
   * Menghapus pilihan jawaban.
   */
  @Delete(':id')
  @Roles(UserRole.INSTRUCTOR, UserRole.ADMIN)
  @ApiOperation({ summary: 'Delete a quiz answer' })
  @ApiResponse({ status: 204, description: 'Answer successfully deleted.' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.quizAnswersService.remove(id);
  }
}
