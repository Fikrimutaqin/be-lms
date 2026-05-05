import { IsString, IsOptional, IsEnum, IsUUID, IsUrl } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { SubmissionStatus } from '../entities/submission.entity';

export class CreateSubmissionDto {
  @ApiProperty({ example: 'uuid-of-assignment' })
  @IsUUID()
  assignmentId: string;

  @ApiProperty({ example: 'uuid-of-user' })
  @IsUUID()
  userId: string;

  @ApiPropertyOptional({ example: 'https://github.com/user/project' })
  @IsOptional()
  @IsUrl()
  submissionUrl?: string;

  @ApiPropertyOptional({ example: 'I have completed the project...' })
  @IsOptional()
  @IsString()
  submissionContent?: string;

  @ApiPropertyOptional({ enum: SubmissionStatus, default: SubmissionStatus.SUBMITTED })
  @IsOptional()
  @IsEnum(SubmissionStatus)
  status?: SubmissionStatus;
}
