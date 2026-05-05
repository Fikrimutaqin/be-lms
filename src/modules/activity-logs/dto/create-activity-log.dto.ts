import { IsString, IsOptional, IsUUID, IsObject } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateActivityLogDto {
  @ApiProperty({ example: 'uuid-of-user' })
  @IsUUID()
  userId: string;

  @ApiProperty({ example: 'LOGIN' })
  @IsString()
  action: string;

  @ApiProperty({ example: 'USER' })
  @IsString()
  entityType: string;

  @ApiPropertyOptional({ example: 'uuid-of-entity' })
  @IsOptional()
  @IsUUID()
  entityId?: string;

  @ApiPropertyOptional({ example: { browser: 'Chrome', os: 'MacOS' } })
  @IsOptional()
  @IsObject()
  changes?: any;

  @ApiPropertyOptional({ example: '127.0.0.1' })
  @IsOptional()
  @IsString()
  ipAddress?: string;
}
