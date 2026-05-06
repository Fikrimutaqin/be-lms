import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Req, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { DiscussionPostsService } from './discussion-posts.service';
import { CreateDiscussionPostDto } from './dto/create-discussion-post.dto';
import { UpdateDiscussionPostDto } from './dto/update-discussion-post.dto';
import { DiscussionPost } from './entities/discussion-post.entity';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import type { Request } from 'express';

@ApiTags('Discussion Posts')
@ApiBearerAuth()
@Controller('discussion-posts')
export class DiscussionPostsController {
  constructor(private readonly discussionPostsService: DiscussionPostsService) { }

  /**
   * Membuat postingan baru di forum diskusi.
   * Author ID otomatis diambil dari user yang sedang login.
   */
  @Post()
  @ApiOperation({ summary: 'Create a new discussion post' })
  @ApiResponse({ status: 201, type: DiscussionPost })
  create(@Body() createDiscussionPostDto: CreateDiscussionPostDto, @Req() req: Request) {
    return this.discussionPostsService.create(createDiscussionPostDto, req.user);
  }

  /**
   * Mengambil daftar semua postingan dengan pagination.
   */
  @Get()
  @ApiOperation({ summary: 'Get all discussion posts' })
  @ApiResponse({ status: 200, type: [DiscussionPost] })
  findAll(@Query() query: PaginationQueryDto) {
    return this.discussionPostsService.findAll(query);
  }

  /**
   * Mengambil semua postingan dalam forum tertentu.
   */
  @Get('forum/:forumId')
  @ApiOperation({ summary: 'Get all posts for a specific forum' })
  @ApiResponse({ status: 200, type: [DiscussionPost] })
  findByForum(@Param('forumId', ParseUUIDPipe) forumId: string) {
    return this.discussionPostsService.findByForum(forumId);
  }

  /**
   * Mengambil riwayat postingan milik user tertentu.
   */
  @Get('user/:userId')
  @ApiOperation({ summary: 'Get all posts by a specific user' })
  @ApiResponse({ status: 200, type: [DiscussionPost] })
  findByUser(@Param('userId', ParseUUIDPipe) userId: string) {
    return this.discussionPostsService.findByUser(userId);
  }

  /**
   * Mengambil detail postingan beserta isi pesannya.
   */
  @Get(':id')
  @ApiOperation({ summary: 'Get a discussion post by id' })
  @ApiResponse({ status: 200, type: DiscussionPost })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.discussionPostsService.findOne(id);
  }

  /**
   * Memperbarui isi postingan.
   * Disarankan menambahkan pengecekan kepemilikan di level service.
   */
  @Patch(':id')
  @ApiOperation({ summary: 'Update a discussion post' })
  @ApiResponse({ status: 200, type: DiscussionPost })
  update(
    @Param('id', ParseUUIDPipe) id: string, 
    @Body() updateDiscussionPostDto: UpdateDiscussionPostDto,
    @Req() req: Request
  ) {
    return this.discussionPostsService.update(id, updateDiscussionPostDto, req.user);
  }

  /**
   * Menghapus postingan.
   */
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a discussion post' })
  @ApiResponse({ status: 204, description: 'Post successfully deleted.' })
  remove(@Param('id', ParseUUIDPipe) id: string, @Req() req: Request) {
    return this.discussionPostsService.remove(id, req.user);
  }
}
