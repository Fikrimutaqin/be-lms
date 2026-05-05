import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { QuizAnswersService } from './quiz-answers.service';
import { CreateQuizAnswerDto } from './dto/create-quiz-answer.dto';
import { UpdateQuizAnswerDto } from './dto/update-quiz-answer.dto';
import { QuizAnswer } from './entities/quiz-answer.entity';

@ApiTags('Quiz Answers')
@Controller('quiz-answers')
export class QuizAnswersController {
  constructor(private readonly quizAnswersService: QuizAnswersService) { }

  @Post()
  @ApiOperation({ summary: 'Submit a quiz answer' })
  @ApiResponse({ status: 201, type: QuizAnswer })
  create(@Body() createQuizAnswerDto: CreateQuizAnswerDto) {
    return this.quizAnswersService.create(createQuizAnswerDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all quiz answers' })
  @ApiResponse({ status: 200, type: [QuizAnswer] })
  findAll() {
    return this.quizAnswersService.findAll();
  }

  @Get('question/:questionId')
  @ApiOperation({ summary: 'Get answers for a specific question' })
  @ApiResponse({ status: 200, type: [QuizAnswer] })
  findByQuestion(@Param('questionId', ParseUUIDPipe) questionId: string) {
    return this.quizAnswersService.findByQuestion(questionId);
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get answers by a specific user' })
  @ApiResponse({ status: 200, type: [QuizAnswer] })
  findByUser(@Param('userId', ParseUUIDPipe) userId: string) {
    return this.quizAnswersService.findByUser(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a quiz answer by id' })
  @ApiResponse({ status: 200, type: QuizAnswer })
  @ApiResponse({ status: 404, description: 'Answer not found.' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.quizAnswersService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a quiz answer (e.g. score)' })
  @ApiResponse({ status: 200, type: QuizAnswer })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateQuizAnswerDto: UpdateQuizAnswerDto) {
    return this.quizAnswersService.update(id, updateQuizAnswerDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a quiz answer' })
  @ApiResponse({ status: 204, description: 'Answer successfully deleted.' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.quizAnswersService.remove(id);
  }
}
