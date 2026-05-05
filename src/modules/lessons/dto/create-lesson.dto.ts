import { IsString, IsOptional, IsInt, IsUUID, MaxLength, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateLessonDto {
  @ApiProperty({ example: 'uuid-of-module' })
  @IsUUID()
  moduleId: string;

  @ApiProperty({ example: 'Introduction to TypeScript' })
  @IsString()
  @MaxLength(255)
  title: string;

  @ApiPropertyOptional({ example: 'In this lesson, we will learn about TypeScript basics...' })
  @IsOptional()
  @IsString()
  content?: string;

  @ApiProperty({ example: 1 })
  @IsInt()
  @Min(0)
  sequenceOrder: number;
}
