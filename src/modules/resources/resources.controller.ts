import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ResourcesService } from './resources.service';
import { CreateResourceDto } from './dto/create-resource.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';
import { Resource } from './entities/resource.entity';

@ApiTags('Resources')
@Controller('resources')
export class ResourcesController {
  constructor(private readonly resourcesService: ResourcesService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new resource' })
  @ApiResponse({ status: 201, type: Resource })
  create(@Body() createResourceDto: CreateResourceDto) {
    return this.resourcesService.create(createResourceDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all resources' })
  @ApiResponse({ status: 200, type: [Resource] })
  findAll() {
    return this.resourcesService.findAll();
  }

  @Get('course/:courseId')
  @ApiOperation({ summary: 'Get all resources for a specific course' })
  @ApiResponse({ status: 200, type: [Resource] })
  findByCourse(@Param('courseId', ParseUUIDPipe) courseId: string) {
    return this.resourcesService.findByCourse(courseId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a resource by id' })
  @ApiResponse({ status: 200, type: Resource })
  @ApiResponse({ status: 404, description: 'Resource not found.' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.resourcesService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a resource' })
  @ApiResponse({ status: 200, type: Resource })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateResourceDto: UpdateResourceDto) {
    return this.resourcesService.update(id, updateResourceDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a resource' })
  @ApiResponse({ status: 204, description: 'Resource successfully deleted.' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.resourcesService.remove(id);
  }
}
