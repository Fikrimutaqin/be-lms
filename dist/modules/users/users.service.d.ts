import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { PaginationQueryDto } from "../../common/dto/pagination-query.dto";
export declare class UsersService {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    create(userData: Partial<User>): Promise<User>;
    findAll(query: PaginationQueryDto): Promise<{
        message: string;
        data: User[];
        meta: {
            totalItems: number;
            itemCount: number;
            itemsPerPage: number;
            totalPages: number;
            currentPage: number;
        };
    }>;
    findOne(id: string): Promise<User>;
    findByEmail(email: string): Promise<User | null>;
    remove(id: string): Promise<void>;
}
