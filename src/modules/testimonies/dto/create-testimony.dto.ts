import { IsString, IsNotEmpty, IsOptional, IsInt, Min, Max, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTestimonyDto {
  @ApiProperty({ example: 'John Doe' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'https://example.com/avatar.jpg', required: false })
  @IsString()
  @IsOptional()
  avatar?: string;

  @ApiProperty({ example: 'This course is awesome!' })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({ example: 5, required: false })
  @IsInt()
  @Min(1)
  @Max(5)
  @IsOptional()
  rating?: number;

  @ApiProperty({ example: 'uuid-of-course', required: false })
  @IsUUID()
  @IsOptional()
  courseId?: string;

  @ApiProperty({ example: 'uuid-of-user', required: false })
  @IsUUID()
  @IsOptional()
  userId?: string;

  @ApiProperty({ example: 'approved', required: false })
  @IsString()
  @IsOptional()
  status?: string;
}
