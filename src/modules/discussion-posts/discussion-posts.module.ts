import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiscussionPostsService } from './discussion-posts.service';
import { DiscussionPostsController } from './discussion-posts.controller';
import { DiscussionPost } from './entities/discussion-post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DiscussionPost])],
  controllers: [DiscussionPostsController],
  providers: [DiscussionPostsService],
  exports: [DiscussionPostsService],
})
export class DiscussionPostsModule {}
