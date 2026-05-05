import { IsString, IsEnum, IsInt, IsUUID, MaxLength, Min, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { ResourceType } from '../entities/resource.entity';

export class CreateResourceDto {
  @ApiProperty({ example: 'uuid-of-course' })
  @IsUUID()
  courseId: string;

  @ApiProperty({ example: 'Course Syllabus' })
  @IsString()
  @MaxLength(255)
  title: string;

  @ApiProperty({ example: 'https://example.com/syllabus.pdf' })
  @IsString()
  @IsUrl()
  resourceUrl: string;

  @ApiProperty({ enum: ResourceType, example: ResourceType.PDF })
  @IsEnum(ResourceType)
  resourceType: ResourceType;

  @ApiProperty({ example: 1 })
  @IsInt()
  @Min(0)
  sequenceOrder: number;
}
