import { Repository, ObjectLiteral, FindManyOptions } from 'typeorm';
import { PaginationQueryDto } from '../dto/pagination-query.dto';

/**
 * Global helper function to handle pagination logic across repositories.
 */
export async function paginate<T extends ObjectLiteral>(
  repository: Repository<T>,
  options: FindManyOptions<T>,
  query: PaginationQueryDto,
  message: string,
) {
  const pageNum = Number(query.page) || 1;
  const limitNum = Number(query.limit) || 10;
  const skip = (pageNum - 1) * limitNum;

  const [items, totalItems] = await repository.findAndCount({
    ...options,
    take: limitNum,
    skip: skip,
  });

  const totalPages = Math.ceil(totalItems / limitNum);

  return {
    message,
    data: items,
    meta: {
      totalItems,
      itemCount: items.length,
      itemsPerPage: limitNum,
      totalPages,
      currentPage: pageNum,
    },
  };
}
