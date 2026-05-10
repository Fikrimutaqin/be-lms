import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { TestimoniesService } from './testimonies.service';
import { CreateTestimonyDto } from './dto/create-testimony.dto';
import { UpdateTestimonyDto } from './dto/update-testimony.dto';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
import { Public } from '../../common/decorators/public.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@ApiTags('Testimonies')
@Controller('testimonies')
export class TestimoniesController {
  constructor(private readonly testimoniesService: TestimoniesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a testimony' })
  create(@Body() createTestimonyDto: CreateTestimonyDto) {
    return this.testimoniesService.create(createTestimonyDto);
  }

  @Public()
  @Get()
  @ApiOperation({ summary: 'Get all approved testimonies' })
  findAll(@Query() paginationQuery: PaginationQueryDto) {
    return this.testimoniesService.findAll(paginationQuery);
  }

  @Public()
  @Get(':id')
  @ApiOperation({ summary: 'Get a testimony by ID' })
  findOne(@Param('id') id: string) {
    return this.testimoniesService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a testimony' })
  update(@Param('id') id: string, @Body() updateTestimonyDto: UpdateTestimonyDto) {
    return this.testimoniesService.update(id, updateTestimonyDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a testimony' })
  remove(@Param('id') id: string) {
    return this.testimoniesService.remove(id);
  }
}
