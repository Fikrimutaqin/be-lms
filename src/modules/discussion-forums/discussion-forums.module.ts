import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiscussionForumsService } from './discussion-forums.service';
import { DiscussionForumsController } from './discussion-forums.controller';
import { DiscussionForum } from './entities/discussion-forum.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DiscussionForum])],
  controllers: [DiscussionForumsController],
  providers: [DiscussionForumsService],
  exports: [DiscussionForumsService],
})
export class DiscussionForumsModule {}
