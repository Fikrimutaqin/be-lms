import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { DiscussionForumsService } from './discussion-forums.service';
import { CreateDiscussionForumDto } from './dto/create-discussion-forum.dto';
import { UpdateDiscussionForumDto } from './dto/update-discussion-forum.dto';
import { DiscussionForum } from './entities/discussion-forum.entity';

@ApiTags('Discussion Forums')
@Controller('discussion-forums')
export class DiscussionForumsController {
  constructor(private readonly discussionForumsService: DiscussionForumsService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new discussion forum' })
  @ApiResponse({ status: 201, type: DiscussionForum })
  create(@Body() createDiscussionForumDto: CreateDiscussionForumDto) {
    return this.discussionForumsService.create(createDiscussionForumDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all discussion forums' })
  @ApiResponse({ status: 200, type: [DiscussionForum] })
  findAll() {
    return this.discussionForumsService.findAll();
  }

  @Get('course/:courseId')
  @ApiOperation({ summary: 'Get all forums for a specific course' })
  @ApiResponse({ status: 200, type: [DiscussionForum] })
  findByCourse(@Param('courseId', ParseUUIDPipe) courseId: string) {
    return this.discussionForumsService.findByCourse(courseId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a discussion forum by id' })
  @ApiResponse({ status: 200, type: DiscussionForum })
  @ApiResponse({ status: 404, description: 'Forum not found.' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.discussionForumsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a discussion forum' })
  @ApiResponse({ status: 200, type: DiscussionForum })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateDiscussionForumDto: UpdateDiscussionForumDto) {
    return this.discussionForumsService.update(id, updateDiscussionForumDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a discussion forum' })
  @ApiResponse({ status: 204, description: 'Forum successfully deleted.' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.discussionForumsService.remove(id);
  }
}
