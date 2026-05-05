import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { Comment } from './entities/comment.entity';
import { DiscussionPost } from '../discussion-posts/entities/discussion-post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, DiscussionPost])],
  controllers: [CommentsController],
  providers: [CommentsService],
  exports: [CommentsService],
})
export class CommentsModule {}
