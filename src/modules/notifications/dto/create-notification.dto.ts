import { IsString, IsEnum, IsUUID, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { NotificationType } from '../entities/notification.entity';

export class CreateNotificationDto {
  @ApiProperty({ example: 'uuid-of-user' })
  @IsUUID()
  userId: string;

  @ApiProperty({ example: 'New Assignment' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'A new assignment has been posted for your course.' })
  @IsString()
  message: string;

  @ApiProperty({ enum: NotificationType, example: NotificationType.ASSIGNMENT })
  @IsEnum(NotificationType)
  type: NotificationType;

  @ApiPropertyOptional({ example: 'uuid-of-assignment' })
  @IsOptional()
  @IsUUID()
  referenceId?: string;
}
