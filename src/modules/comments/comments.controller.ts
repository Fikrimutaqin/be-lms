import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';
import type { Request } from 'express';

@ApiTags('Comments')
@ApiBearerAuth()
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) { }

  /**
   * Memberikan komentar atau balasan pada sebuah postingan forum.
   * User ID diambil otomatis dari user yang sedang login.
   */
  @Post()
  @ApiOperation({ summary: 'Add a comment to a post' })
  @ApiResponse({ status: 201, type: Comment })
  create(@Body() createCommentDto: CreateCommentDto, @Req() req: Request) {
    return this.commentsService.create(createCommentDto, req.user);
  }

  /**
   * Mengambil semua daftar komentar (Hanya untuk keperluan audit/Admin).
   */
  @Get()
  @ApiOperation({ summary: 'Get all comments' })
  @ApiResponse({ status: 200, type: [Comment] })
  findAll() {
    return this.commentsService.findAll();
  }

  /**
   * Mengambil semua komentar yang ada pada satu postingan tertentu.
   */
  @Get('post/:postId')
  @ApiOperation({ summary: 'Get all comments for a specific post' })
  @ApiResponse({ status: 200, type: [Comment] })
  findByPost(@Param('postId', ParseUUIDPipe) postId: string) {
    return this.commentsService.findByPost(postId);
  }

  /**
   * Mengambil detail satu komentar.
   */
  @Get(':id')
  @ApiOperation({ summary: 'Get a comment by id' })
  @ApiResponse({ status: 200, type: Comment })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.commentsService.findOne(id);
  }

  /**
   * Mengupdate isi komentar.
   */
  @Patch(':id')
  @ApiOperation({ summary: 'Update a comment' })
  @ApiResponse({ status: 200, type: Comment })
  update(
    @Param('id', ParseUUIDPipe) id: string, 
    @Body() updateCommentDto: UpdateCommentDto,
    @Req() req: Request
  ) {
    return this.commentsService.update(id, updateCommentDto, req.user);
  }

  /**
   * Menghapus komentar.
   */
  @Delete(':id')
  @ApiOperation({ summary: 'Delete a comment' })
  @ApiResponse({ status: 204, description: 'Comment successfully deleted.' })
  remove(@Param('id', ParseUUIDPipe) id: string, @Req() req: Request) {
    return this.commentsService.remove(id, req.user);
  }
}
