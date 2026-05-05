import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { DiscussionPostsService } from './discussion-posts.service';
import { CreateDiscussionPostDto } from './dto/create-discussion-post.dto';
import { UpdateDiscussionPostDto } from './dto/update-discussion-post.dto';
import { DiscussionPost } from './entities/discussion-post.entity';

@ApiTags('Discussion Posts')
@Controller('discussion-posts')
export class DiscussionPostsController {
  constructor(private readonly discussionPostsService: DiscussionPostsService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new discussion post' })
  @ApiResponse({ status: 201, type: DiscussionPost })
  create(@Body() createDiscussionPostDto: CreateDiscussionPostDto) {
    return this.discussionPostsService.create(createDiscussionPostDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all discussion posts' })
  @ApiResponse({ status: 200, type: [DiscussionPost] })
  findAll() {
    return this.discussionPostsService.findAll();
  }

  @Get('forum/:forumId')
  @ApiOperation({ summary: 'Get all posts for a specific forum' })
  @ApiResponse({ status: 200, type: [DiscussionPost] })
  findByForum(@Param('forumId', ParseUUIDPipe) forumId: string) {
    return this.discussionPostsService.findByForum(forumId);
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get all posts by a specific user' })
  @ApiResponse({ status: 200, type: [DiscussionPost] })
  findByUser(@Param('userId', ParseUUIDPipe) userId: string) {
    return this.discussionPostsService.findByUser(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a discussion post by id' })
  @ApiResponse({ status: 200, type: DiscussionPost })
  @ApiResponse({ status: 404, description: 'Post not found.' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.discussionPostsService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a discussion post' })
  @ApiResponse({ status: 200, type: DiscussionPost })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateDiscussionPostDto: UpdateDiscussionPostDto) {
    return this.discussionPostsService.update(id, updateDiscussionPostDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a discussion post' })
  @ApiResponse({ status: 204, description: 'Post successfully deleted.' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.discussionPostsService.remove(id);
  }
}
