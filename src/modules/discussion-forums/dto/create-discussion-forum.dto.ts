import { IsString, IsOptional, IsUUID, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateDiscussionForumDto {
  @ApiProperty({ example: 'uuid-of-course' })
  @IsUUID()
  courseId: string;

  @ApiProperty({ example: 'General Discussion' })
  @IsString()
  @MaxLength(255)
  title: string;

  @ApiPropertyOptional({ example: 'A place for students to discuss anything related to the course.' })
  @IsOptional()
  @IsString()
  description?: string;
}
