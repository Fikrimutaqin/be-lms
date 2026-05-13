import { IsOptional, IsUUID } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { PaginationQueryDto } from '../../../common/dto/pagination-query.dto';

export class CourseQueryDto extends PaginationQueryDto {
  @ApiPropertyOptional({ description: 'Filter by Category ID' })
  @IsOptional()
  @IsUUID()
  categoryId?: string;
}
