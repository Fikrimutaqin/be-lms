import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AssignmentsService } from './assignments.service';
import { CreateAssignmentDto } from './dto/create-assignment.dto';
import { UpdateAssignmentDto } from './dto/update-assignment.dto';
import { Assignment } from './entities/assignment.entity';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserRole } from '../users/entities/user.entity';

@ApiTags('Assignments')
@ApiBearerAuth()
@Controller('assignments')
export class AssignmentsController {
  constructor(private readonly assignmentsService: AssignmentsService) { }

  /**
   * Membuat tugas baru untuk kursus.
   * Hanya Instruktur atau Admin.
   */
  @Post()
  @Roles(UserRole.INSTRUCTOR, UserRole.ADMIN)
  @ApiOperation({ summary: 'Create a new assignment' })
  @ApiResponse({ status: 201, type: Assignment })
  create(@Body() createAssignmentDto: CreateAssignmentDto) {
    return this.assignmentsService.create(createAssignmentDto);
  }

  /**
   * Mengambil semua daftar tugas (Hanya Admin).
   */
  @Get()
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Get all assignments' })
  @ApiResponse({ status: 200, type: [Assignment] })
  findAll() {
    return this.assignmentsService.findAll();
  }

  /**
   * Mengambil semua tugas milik satu kursus tertentu.
   */
  @Get('course/:courseId')
  @ApiOperation({ summary: 'Get all assignments for a specific course' })
  @ApiResponse({ status: 200, type: [Assignment] })
  findByCourse(@Param('courseId', ParseUUIDPipe) courseId: string) {
    return this.assignmentsService.findByCourse(courseId);
  }

  /**
   * Mengambil detail tugas berdasarkan ID.
   */
  @Get(':id')
  @ApiOperation({ summary: 'Get an assignment by id' })
  @ApiResponse({ status: 200, type: Assignment })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.assignmentsService.findOne(id);
  }

  /**
   * Memperbarui data tugas.
   */
  @Patch(':id')
  @Roles(UserRole.INSTRUCTOR, UserRole.ADMIN)
  @ApiOperation({ summary: 'Update an assignment' })
  @ApiResponse({ status: 200, type: Assignment })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateAssignmentDto: UpdateAssignmentDto) {
    return this.assignmentsService.update(id, updateAssignmentDto);
  }

  /**
   * Menghapus tugas.
   */
  @Delete(':id')
  @Roles(UserRole.INSTRUCTOR, UserRole.ADMIN)
  @ApiOperation({ summary: 'Delete an assignment' })
  @ApiResponse({ status: 204, description: 'Assignment successfully deleted.' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.assignmentsService.remove(id);
  }
}
