import { IsString, IsOptional, IsUUID, IsUrl } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateCertificateDto {
  @ApiProperty({ example: 'uuid-of-user' })
  @IsUUID()
  userId: string;

  @ApiProperty({ example: 'uuid-of-course' })
  @IsUUID()
  courseId: string;

  @ApiPropertyOptional({ example: 'https://example.com/certificates/user-course.pdf' })
  @IsOptional()
  @IsUrl()
  certificateUrl?: string;
}
