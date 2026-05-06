import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { ResourcesService } from './resources.service';
import { CreateResourceDto } from './dto/create-resource.dto';
import { UpdateResourceDto } from './dto/update-resource.dto';
import { Resource } from './entities/resource.entity';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserRole } from '../users/entities/user.entity';

@ApiTags('Resources')
@ApiBearerAuth()
@Controller('resources')
export class ResourcesController {
  constructor(private readonly resourcesService: ResourcesService) { }

  /**
   * Menambahkan resource baru (misal: PDF, Link, atau File).
   */
  @Post()
  @Roles(UserRole.INSTRUCTOR, UserRole.ADMIN)
  @ApiOperation({ summary: 'Create a new resource' })
  @ApiResponse({ status: 201, type: Resource })
  create(@Body() createResourceDto: CreateResourceDto) {
    return this.resourcesService.create(createResourceDto);
  }

  /**
   * Mengambil semua resource yang terdaftar.
   */
  @Get()
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Get all resources' })
  @ApiResponse({ status: 200, type: [Resource] })
  findAll() {
    return this.resourcesService.findAll();
  }

  /**
   * Mengambil semua resource milik satu kursus tertentu.
   */
  @Get('course/:courseId')
  @ApiOperation({ summary: 'Get all resources for a specific course' })
  @ApiResponse({ status: 200, type: [Resource] })
  findByCourse(@Param('courseId', ParseUUIDPipe) courseId: string) {
    return this.resourcesService.findByCourse(courseId);
  }

  /**
   * Mengambil detail resource.
   */
  @Get(':id')
  @ApiOperation({ summary: 'Get a resource by id' })
  @ApiResponse({ status: 200, type: Resource })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.resourcesService.findOne(id);
  }

  /**
   * Memperbarui data resource.
   */
  @Patch(':id')
  @Roles(UserRole.INSTRUCTOR, UserRole.ADMIN)
  @ApiOperation({ summary: 'Update a resource' })
  @ApiResponse({ status: 200, type: Resource })
  update(@Param('id', ParseUUIDPipe) id: string, @Body() updateResourceDto: UpdateResourceDto) {
    return this.resourcesService.update(id, updateResourceDto);
  }

  /**
   * Menghapus resource.
   */
  @Delete(':id')
  @Roles(UserRole.INSTRUCTOR, UserRole.ADMIN)
  @ApiOperation({ summary: 'Delete a resource' })
  @ApiResponse({ status: 204, description: 'Resource successfully deleted.' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.resourcesService.remove(id);
  }
}
