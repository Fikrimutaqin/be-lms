import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { EnrollmentsService } from './enrollments.service';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { UpdateEnrollmentDto } from './dto/update-enrollment.dto';
import { Enrollment } from './entities/enrollment.entity';

@ApiTags('Enrollments')
@Controller('enrollments')
export class EnrollmentsController {
  constructor(private readonly enrollmentsService: EnrollmentsService) { }

  @Get('user/:userId/progress')
  @ApiOperation({ summary: 'Get progress for a specific user across all courses' })
  @ApiResponse({ status: 200, description: 'Return student progress stats.' })
  getStudentProgress(@Param('userId', ParseUUIDPipe) userId: string) {
    return this.enrollmentsService.getStudentProgress(userId);
  }

  @Get('course/:courseId/progress')
  @ApiOperation({ summary: 'Get progress for all students in a specific course' })
  @ApiResponse({ status: 200, description: 'Return course-wide student progress stats.' })
  getCourseProgress(@Param('courseId', ParseUUIDPipe) courseId: string) {
    return this.enrollmentsService.getCourseProgress(courseId);
  }

  @Post()
  @ApiOperation({ summary: 'Enroll a user in a course' })
  @ApiResponse({ status: 201, description: 'User successfully enrolled.', type: Enrollment })
  @ApiResponse({ status: 409, description: 'User already enrolled.' })
  create(@Body() createEnrollmentDto: CreateEnrollmentDto) {
    return this.enrollmentsService.create(createEnrollmentDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all enrollments' })
  @ApiResponse({ status: 200, type: [Enrollment] })
  findAll() {
    return this.enrollmentsService.findAll();
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get enrollments for a specific user' })
  @ApiResponse({ status: 200, type: [Enrollment] })
  findByUser(@Param('userId', ParseUUIDPipe) userId: string) {
    return this.enrollmentsService.findByUser(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get enrollment by id' })
  @ApiResponse({ status: 200, type: Enrollment })
  @ApiResponse({ status: 404, description: 'Enrollment not found.' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.enrollmentsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update enrollment status' })
  @ApiResponse({ status: 200, type: Enrollment })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateEnrollmentDto: UpdateEnrollmentDto) {
    return this.enrollmentsService.update(id, updateEnrollmentDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remove an enrollment' })
  @ApiResponse({ status: 204, description: 'Enrollment removed.' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.enrollmentsService.remove(id);
  }
}
