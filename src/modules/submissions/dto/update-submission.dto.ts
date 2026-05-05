import { IsString, IsOptional, IsEnum, IsUrl } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { SubmissionStatus } from '../entities/submission.entity';

export class UpdateSubmissionDto {
  @ApiPropertyOptional({ example: 'https://github.com/user/project-updated' })
  @IsOptional()
  @IsUrl()
  submissionUrl?: string;

  @ApiPropertyOptional({ example: 'Updated content...' })
  @IsOptional()
  @IsString()
  submissionContent?: string;

  @ApiPropertyOptional({ enum: SubmissionStatus })
  @IsOptional()
  @IsEnum(SubmissionStatus)
  status?: SubmissionStatus;
}
