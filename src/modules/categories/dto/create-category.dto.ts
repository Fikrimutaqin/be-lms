import { IsString, IsOptional, MaxLength, Matches } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCategoryDto {
  @ApiProperty({ example: 'Web Development' })
  @IsString()
  @MaxLength(100)
  name: string;

  @ApiProperty({ example: 'web-development' })
  @IsString()
  @MaxLength(100)
  @Matches(/^[a-z0-9-]+$/, { message: 'Slug must be kebab-case' })
  slug: string;

  @ApiPropertyOptional({ example: 'https://example.com/image.png' })
  @IsOptional()
  @IsString()
  image?: string;

  @ApiPropertyOptional({ example: 'Courses related to web technologies' })
  @IsOptional()
  @IsString()
  description?: string;
}
