import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { QuizzesService } from './quizzes.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { Quiz } from './entities/quiz.entity';

@ApiTags('Quizzes')
@Controller('quizzes')
export class QuizzesController {
  constructor(private readonly quizzesService: QuizzesService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new quiz' })
  @ApiResponse({ status: 201, type: Quiz })
  create(@Body() createQuizDto: CreateQuizDto) {
    return this.quizzesService.create(createQuizDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all quizzes' })
  @ApiResponse({ status: 200, type: [Quiz] })
  findAll() {
    return this.quizzesService.findAll();
  }

  @Get('course/:courseId')
  @ApiOperation({ summary: 'Get all quizzes for a specific course' })
  @ApiResponse({ status: 200, type: [Quiz] })
  findByCourse(@Param('courseId', ParseUUIDPipe) courseId: string) {
    return this.quizzesService.findByCourse(courseId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a quiz by id' })
  @ApiResponse({ status: 200, type: Quiz })
  @ApiResponse({ status: 404, description: 'Quiz not found.' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.quizzesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a quiz' })
  @ApiResponse({ status: 200, type: Quiz })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateQuizDto: UpdateQuizDto) {
    return this.quizzesService.update(id, updateQuizDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a quiz' })
  @ApiResponse({ status: 204, description: 'Quiz successfully deleted.' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.quizzesService.remove(id);
  }
}
