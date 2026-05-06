import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { DiscussionForumsService } from './discussion-forums.service';
import { CreateDiscussionForumDto } from './dto/create-discussion-forum.dto';
import { UpdateDiscussionForumDto } from './dto/update-discussion-forum.dto';
import { DiscussionForum } from './entities/discussion-forum.entity';
import { Roles } from '../../common/decorators/roles.decorator';
import { UserRole } from '../users/entities/user.entity';

@ApiTags('Discussion Forums')
@ApiBearerAuth()
@Controller('discussion-forums')
export class DiscussionForumsController {
  constructor(private readonly discussionForumsService: DiscussionForumsService) { }

  /**
   * Membuat forum diskusi baru untuk kursus.
   * Biasanya otomatis dibuat saat kursus dibuat.
   */
  @Post()
  @Roles(UserRole.INSTRUCTOR, UserRole.ADMIN)
  @ApiOperation({ summary: 'Create a new discussion forum' })
  @ApiResponse({ status: 201, type: DiscussionForum })
  create(@Body() createDiscussionForumDto: CreateDiscussionForumDto) {
    return this.discussionForumsService.create(createDiscussionForumDto);
  }

  /**
   * Mengambil semua daftar forum (Hanya Admin).
   */
  @Get()
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Get all discussion forums' })
  @ApiResponse({ status: 200, type: [DiscussionForum] })
  findAll() {
    return this.discussionForumsService.findAll();
  }

  /**
   * Mengambil forum diskusi yang terikat dengan kursus tertentu.
   */
  @Get('course/:courseId')
  @ApiOperation({ summary: 'Get all forums for a specific course' })
  @ApiResponse({ status: 200, type: [DiscussionForum] })
  findByCourse(@Param('courseId', ParseUUIDPipe) courseId: string) {
    return this.discussionForumsService.findByCourse(courseId);
  }

  /**
   * Mengambil detail forum diskusi berdasarkan ID.
   */
  @Get(':id')
  @ApiOperation({ summary: 'Get a discussion forum by id' })
  @ApiResponse({ status: 200, type: DiscussionForum })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.discussionForumsService.findOne(id);
  }

  /**
   * Memperbarui data forum.
   */
  @Patch(':id')
  @Roles(UserRole.INSTRUCTOR, UserRole.ADMIN)
  @ApiOperation({ summary: 'Update a discussion forum' })
  @ApiResponse({ status: 200, type: DiscussionForum })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateDiscussionForumDto: UpdateDiscussionForumDto) {
    return this.discussionForumsService.update(id, updateDiscussionForumDto);
  }

  /**
   * Menghapus forum diskusi.
   */
  @Delete(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Delete a discussion forum' })
  @ApiResponse({ status: 204, description: 'Forum successfully deleted.' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.discussionForumsService.remove(id);
  }
}
