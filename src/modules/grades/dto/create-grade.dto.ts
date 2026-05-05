import { IsString, IsOptional, IsNumber, IsUUID, MaxLength, Min, IsIn } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateGradeDto {
  @ApiProperty({ example: 'uuid-of-user' })
  @IsUUID()
  userId: string;

  @ApiPropertyOptional({ example: 'uuid-of-submission' })
  @IsOptional()
  @IsUUID()
  submissionId?: string;

  @ApiPropertyOptional({ example: 'uuid-of-quiz-answer' })
  @IsOptional()
  @IsUUID()
  quizAnswerId?: string;

  @ApiProperty({ example: 95.5 })
  @IsNumber()
  @Min(0)
  score: number;

  @ApiPropertyOptional({ example: 'A' })
  @IsOptional()
  @IsString()
  @MaxLength(2)
  @IsIn(['A', 'B', 'C', 'D', 'F'])
  gradeLetter?: string;

  @ApiPropertyOptional({ example: 'Excellent work!' })
  @IsOptional()
  @IsString()
  feedback?: string;
}
