import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SubmissionsService } from './submissions.service';
import { CreateSubmissionDto } from './dto/create-submission.dto';
import { UpdateSubmissionDto } from './dto/update-submission.dto';
import { Submission } from './entities/submission.entity';

@ApiTags('Submissions')
@Controller('submissions')
export class SubmissionsController {
  constructor(private readonly submissionsService: SubmissionsService) { }

  @Post()
  @ApiOperation({ summary: 'Submit an assignment' })
  @ApiResponse({ status: 201, type: Submission })
  @ApiResponse({ status: 409, description: 'User already submitted.' })
  create(@Body() createSubmissionDto: CreateSubmissionDto) {
    return this.submissionsService.create(createSubmissionDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all submissions' })
  @ApiResponse({ status: 200, type: [Submission] })
  findAll() {
    return this.submissionsService.findAll();
  }

  @Get('assignment/:assignmentId')
  @ApiOperation({ summary: 'Get submissions for a specific assignment' })
  @ApiResponse({ status: 200, type: [Submission] })
  findByAssignment(@Param('assignmentId', ParseUUIDPipe) assignmentId: string) {
    return this.submissionsService.findByAssignment(assignmentId);
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get submissions by a specific user' })
  @ApiResponse({ status: 200, type: [Submission] })
  findByUser(@Param('userId', ParseUUIDPipe) userId: string) {
    return this.submissionsService.findByUser(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a submission by id' })
  @ApiResponse({ status: 200, type: Submission })
  @ApiResponse({ status: 404, description: 'Submission not found.' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.submissionsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a submission (e.g. status or content)' })
  @ApiResponse({ status: 200, type: Submission })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateSubmissionDto: UpdateSubmissionDto) {
    return this.submissionsService.update(id, updateSubmissionDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a submission' })
  @ApiResponse({ status: 204, description: 'Submission successfully deleted.' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.submissionsService.remove(id);
  }
}
