import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { SubmissionsService } from './submissions.service';
import { CreateSubmissionDto } from './dto/create-submission.dto';
import { UpdateSubmissionDto } from './dto/update-submission.dto';
import { Submission } from './entities/submission.entity';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from '../users/entities/user.entity';
import type { Request } from 'express';

@ApiTags('Submissions')
@ApiBearerAuth()
@Controller('submissions')
export class SubmissionsController {
  constructor(private readonly submissionsService: SubmissionsService) { }

  /**
   * Mengumpulkan tugas.
   * Student ID otomatis diambil dari token JWT.
   */
  @Post()
  @Roles(UserRole.STUDENT, UserRole.ADMIN)
  @ApiOperation({ summary: 'Submit an assignment' })
  @ApiResponse({ status: 201, type: Submission })
  create(@Body() createSubmissionDto: CreateSubmissionDto, @Req() req: Request) {
    return this.submissionsService.create(createSubmissionDto, req.user);
  }

  /**
   * Mengambil semua daftar pengumpulan (Hanya Admin).
   */
  @Get()
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Get all submissions' })
  @ApiResponse({ status: 200, type: [Submission] })
  findAll() {
    return this.submissionsService.findAll();
  }

  /**
   * Mengambil semua pengumpulan untuk satu tugas tertentu.
   * Digunakan oleh instruktur untuk melihat siapa saja yang sudah mengumpulkan.
   */
  @Get('assignment/:assignmentId')
  @Roles(UserRole.INSTRUCTOR, UserRole.ADMIN)
  @ApiOperation({ summary: 'Get submissions for a specific assignment' })
  @ApiResponse({ status: 200, type: [Submission] })
  findByAssignment(@Param('assignmentId', ParseUUIDPipe) assignmentId: string) {
    return this.submissionsService.findByAssignment(assignmentId);
  }

  /**
   * Mengambil riwayat pengumpulan tugas milik user tertentu.
   */
  @Get('user/:userId')
  @ApiOperation({ summary: 'Get submissions by a specific user' })
  @ApiResponse({ status: 200, type: [Submission] })
  findByUser(@Param('userId', ParseUUIDPipe) userId: string) {
    return this.submissionsService.findByUser(userId);
  }

  /**
   * Mengambil detail pengumpulan tugas.
   */
  @Get(':id')
  @ApiOperation({ summary: 'Get a submission by id' })
  @ApiResponse({ status: 200, type: Submission })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.submissionsService.findOne(id);
  }

  /**
   * Memperbarui data pengumpulan (misal: revisi jawaban atau penilaian).
   */
  @Patch(':id')
  @ApiOperation({ summary: 'Update a submission (e.g. status or content)' })
  @ApiResponse({ status: 200, type: Submission })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateSubmissionDto: UpdateSubmissionDto) {
    return this.submissionsService.update(id, updateSubmissionDto);
  }

  /**
   * Menghapus pengumpulan tugas.
   */
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a submission' })
  @ApiResponse({ status: 204, description: 'Submission successfully deleted.' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.submissionsService.remove(id);
  }
}
