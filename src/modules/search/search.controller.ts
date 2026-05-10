import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SearchService } from './search.service';
import { Public } from '../../common/decorators/public.decorator';
import { SearchQueryDto } from './dto/search-query.dto';
import { ThrottlerGuard } from '@nestjs/throttler';

@ApiTags('Search')
@Controller('search')
@UseGuards(ThrottlerGuard)
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'Public search for courses by title and categories by name' })
  @ApiResponse({ status: 200, description: 'Return search results.' })
  async search(@Query() query: SearchQueryDto) {
    return await this.searchService.search(query.q || '', query);
  }
}
