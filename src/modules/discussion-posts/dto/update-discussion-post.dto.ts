import { PartialType } from '@nestjs/swagger';
import { CreateDiscussionPostDto } from './create-discussion-post.dto';

export class UpdateDiscussionPostDto extends PartialType(CreateDiscussionPostDto) {}
