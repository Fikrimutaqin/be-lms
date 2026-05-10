import { Controller, Get, Param, Delete, ParseUUIDPipe, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { Roles } from '../../common/decorators/roles.decorator';
import { Public } from '../../common/decorators/public.decorator';
import { UserRole } from './entities/user.entity';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * Mengambil semua daftar user (Hanya Admin).
   * Mendukung pagination.
   */
  @Get()
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'Return all users.' })
  findAll(@Query() query: PaginationQueryDto) {
    return this.usersService.findAll(query);
  }

  /**
   * Mengambil daftar instruktur untuk landing page (Publik).
   */
  @Public()
  @Get('instructors')
  @ApiOperation({ summary: 'Get all instructors for landing page' })
  @ApiResponse({ status: 200, description: 'Return all instructors.' })
  findInstructors(@Query() query: PaginationQueryDto) {
    return this.usersService.findInstructors(query);
  }

  /**
   * Mengambil satu data user berdasarkan ID.
   */
  @Get(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Get a user by id' })
  @ApiResponse({ status: 200, description: 'Return a user.' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.findOne(id);
  }

  /**
   * Menghapus user (Hanya Admin).
   */
  @Delete(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Delete a user' })
  @ApiResponse({ status: 204, description: 'User successfully deleted.' })
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.remove(id);
  }
}
