import { IsString, IsUUID, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateDiscussionPostDto {
  @ApiProperty({ example: 'uuid-of-forum' })
  @IsUUID()
  forumId: string;

  @ApiProperty({ example: 'uuid-of-user' })
  @IsUUID()
  userId: string;

  @ApiProperty({ example: 'Help with Assignment 1' })
  @IsString()
  @MaxLength(255)
  title: string;

  @ApiProperty({ example: 'I am struggling with the CSS layout part. Any tips?' })
  @IsString()
  content: string;
}
