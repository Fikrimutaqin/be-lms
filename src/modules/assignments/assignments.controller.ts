import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AssignmentsService } from './assignments.service';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { UpdateAssignmentDto } from './dto/update-assignment.dto';
import { Assignment } from './entities/assignment.entity';

@ApiTags('Assignments')
@Controller('assignments')
export class AssignmentsController {
  constructor(private readonly assignmentsService: AssignmentsService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new assignment' })
  @ApiResponse({ status: 201, type: Assignment })
  create(@Body() createAssignmentDto: CreateAssignmentDto) {
    return this.assignmentsService.create(createAssignmentDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all assignments' })
  @ApiResponse({ status: 200, type: [Assignment] })
  findAll() {
    return this.assignmentsService.findAll();
  }

  @Get('course/:courseId')
  @ApiOperation({ summary: 'Get all assignments for a specific course' })
  @ApiResponse({ status: 200, type: [Assignment] })
  findByCourse(@Param('courseId', ParseUUIDPipe) courseId: string) {
    return this.assignmentsService.findByCourse(courseId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an assignment by id' })
  @ApiResponse({ status: 200, type: Assignment })
  @ApiResponse({ status: 404, description: 'Assignment not found.' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.assignmentsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an assignment' })
  @ApiResponse({ status: 200, type: Assignment })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateAssignmentDto: UpdateAssignmentDto) {
    return this.assignmentsService.update(id, updateAssignmentDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an assignment' })
  @ApiResponse({ status: 204, description: 'Assignment successfully deleted.' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.assignmentsService.remove(id);
  }
}
