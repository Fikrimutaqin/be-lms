import { PartialType } from '@nestjs/swagger';
import { CreateDiscussionForumDto } from './create-discussion-forum.dto';

export class UpdateDiscussionForumDto extends PartialType(CreateDiscussionForumDto) {}
