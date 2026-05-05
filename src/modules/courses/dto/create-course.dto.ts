import { IsString, IsOptional, IsUUID, IsNumber, MaxLength } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCourseDto {
  @ApiProperty({ example: 'Introduction to NestJS' })
  @IsString()
  @MaxLength(255)
  title: string;

  @ApiPropertyOptional({ example: 'Learn the basics of NestJS framework' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ example: 'Web Development' })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  category?: string;

  @ApiPropertyOptional({ example: 10.5 })
  @IsOptional()
  @IsNumber()
  durationHours?: number;

  @ApiProperty({ example: 'uuid-of-instructor' })
  @IsUUID()
  instructorId: string;
}
