import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { LessonsService } from './lessons.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { Lesson } from './entities/lesson.entity';

@ApiTags('Lessons')
@Controller('lessons')
export class LessonsController {
  constructor(private readonly lessonsService: LessonsService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new lesson' })
  @ApiResponse({ status: 201, type: Lesson })
  create(@Body() createLessonDto: CreateLessonDto) {
    return this.lessonsService.create(createLessonDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all lessons' })
  @ApiResponse({ status: 200, type: [Lesson] })
  findAll() {
    return this.lessonsService.findAll();
  }

  @Get('module/:moduleId')
  @ApiOperation({ summary: 'Get all lessons for a specific module' })
  @ApiResponse({ status: 200, type: [Lesson] })
  findByModule(@Param('moduleId', ParseUUIDPipe) moduleId: string) {
    return this.lessonsService.findByModule(moduleId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a lesson by id' })
  @ApiResponse({ status: 200, type: Lesson })
  @ApiResponse({ status: 404, description: 'Lesson not found.' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.lessonsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a lesson' })
  @ApiResponse({ status: 200, type: Lesson })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateLessonDto: UpdateLessonDto) {
    return this.lessonsService.update(id, updateLessonDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a lesson' })
  @ApiResponse({ status: 204, description: 'Lesson successfully deleted.' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.lessonsService.remove(id);
  }
}
