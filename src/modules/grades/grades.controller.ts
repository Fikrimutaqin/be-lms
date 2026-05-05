import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { GradesService } from './grades.service';
import { CreateGradeDto } from './dto/create-grade.dto';
import { UpdateGradeDto } from './dto/update-grade.dto';
import { Grade } from './entities/grade.entity';

@ApiTags('Grades')
@Controller('grades')
export class GradesController {
  constructor(private readonly gradesService: GradesService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new grade' })
  @ApiResponse({ status: 201, type: Grade })
  @ApiResponse({ status: 400, description: 'Missing required reference (submission or quiz answer).' })
  create(@Body() createGradeDto: CreateGradeDto) {
    return this.gradesService.create(createGradeDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all grades' })
  @ApiResponse({ status: 200, type: [Grade] })
  findAll() {
    return this.gradesService.findAll();
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get all grades for a specific user' })
  @ApiResponse({ status: 200, type: [Grade] })
  findByUser(@Param('userId', ParseUUIDPipe) userId: string) {
    return this.gradesService.findByUser(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a grade by id' })
  @ApiResponse({ status: 200, type: Grade })
  @ApiResponse({ status: 404, description: 'Grade not found.' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.gradesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a grade' })
  @ApiResponse({ status: 200, type: Grade })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateGradeDto: UpdateGradeDto) {
    return this.gradesService.update(id, updateGradeDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a grade' })
  @ApiResponse({ status: 204, description: 'Grade successfully deleted.' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.gradesService.remove(id);
  }
}
