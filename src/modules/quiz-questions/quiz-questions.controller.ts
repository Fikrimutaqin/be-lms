import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { QuizQuestionsService } from './quiz-questions.service';
import { CreateQuizQuestionDto } from './dto/create-quiz-question.dto';
import { UpdateQuizQuestionDto } from './dto/update-quiz-question.dto';
import { QuizQuestion } from './entities/quiz-question.entity';

@ApiTags('Quiz Questions')
@Controller('quiz-questions')
export class QuizQuestionsController {
  constructor(private readonly quizQuestionsService: QuizQuestionsService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new quiz question' })
  @ApiResponse({ status: 201, type: QuizQuestion })
  create(@Body() createQuizQuestionDto: CreateQuizQuestionDto) {
    return this.quizQuestionsService.create(createQuizQuestionDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all quiz questions' })
  @ApiResponse({ status: 200, type: [QuizQuestion] })
  findAll() {
    return this.quizQuestionsService.findAll();
  }

  @Get('quiz/:quizId')
  @ApiOperation({ summary: 'Get all questions for a specific quiz' })
  @ApiResponse({ status: 200, type: [QuizQuestion] })
  findByQuiz(@Param('quizId', ParseUUIDPipe) quizId: string) {
    return this.quizQuestionsService.findByQuiz(quizId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a quiz question by id' })
  @ApiResponse({ status: 200, type: QuizQuestion })
  @ApiResponse({ status: 404, description: 'Question not found.' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.quizQuestionsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a quiz question' })
  @ApiResponse({ status: 200, type: QuizQuestion })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateQuizQuestionDto: UpdateQuizQuestionDto) {
    return this.quizQuestionsService.update(id, updateQuizQuestionDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a quiz question' })
  @ApiResponse({ status: 204, description: 'Question successfully deleted.' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.quizQuestionsService.remove(id);
  }
}
