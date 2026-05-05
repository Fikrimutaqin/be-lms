import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CourseModulesService } from './course-modules.service';
import { CreateCourseModuleDto } from './dto/create-course-module.dto';
import { UpdateCourseModuleDto } from './dto/update-course-module.dto';
import { CourseModule } from './entities/course-module.entity';

@ApiTags('Course Modules')
@Controller('course-modules')
export class CourseModulesController {
  constructor(private readonly courseModulesService: CourseModulesService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new module for a course' })
  @ApiResponse({ status: 201, type: CourseModule })
  create(@Body() createCourseModuleDto: CreateCourseModuleDto) {
    return this.courseModulesService.create(createCourseModuleDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all modules' })
  @ApiResponse({ status: 200, type: [CourseModule] })
  findAll() {
    return this.courseModulesService.findAll();
  }

  @Get('course/:courseId')
  @ApiOperation({ summary: 'Get all modules for a specific course' })
  @ApiResponse({ status: 200, type: [CourseModule] })
  findByCourse(@Param('courseId', ParseUUIDPipe) courseId: string) {
    return this.courseModulesService.findByCourse(courseId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a module by id' })
  @ApiResponse({ status: 200, type: CourseModule })
  @ApiResponse({ status: 404, description: 'Module not found.' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.courseModulesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a module' })
  @ApiResponse({ status: 200, type: CourseModule })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateCourseModuleDto: UpdateCourseModuleDto) {
    return this.courseModulesService.update(id, updateCourseModuleDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a module' })
  @ApiResponse({ status: 204, description: 'Module successfully deleted.' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.courseModulesService.remove(id);
  }
}
