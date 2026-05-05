import { IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({ example: 'uuid-of-post' })
  @IsUUID()
  postId: string;

  @ApiProperty({ example: 'uuid-of-user' })
  @IsUUID()
  userId: string;

  @ApiProperty({ example: 'I agree with your point! Very helpful.' })
  @IsString()
  content: string;
}
