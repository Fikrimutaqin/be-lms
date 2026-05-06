import { Repository } from 'typeorm';
import { DiscussionPost } from './entities/discussion-post.entity';
import { CreateDiscussionPostDto } from './dto/create-discussion-post.dto';
import { UpdateDiscussionPostDto } from './dto/update-discussion-post.dto';
import { PaginationQueryDto } from "../../common/dto/pagination-query.dto";
export declare class DiscussionPostsService {
    private readonly postRepository;
    constructor(postRepository: Repository<DiscussionPost>);
    create(createDiscussionPostDto: CreateDiscussionPostDto, user: any): Promise<DiscussionPost>;
    findAll(query: PaginationQueryDto): Promise<{
        message: string;
        data: DiscussionPost[];
        meta: {
            totalItems: number;
            itemCount: number;
            itemsPerPage: number;
            totalPages: number;
            currentPage: number;
        };
    }>;
    findByForum(forumId: string): Promise<{
        message: string;
        data: DiscussionPost[];
    }>;
    findByUser(userId: string): Promise<{
        message: string;
        data: DiscussionPost[];
    }>;
    findOne(id: string): Promise<DiscussionPost>;
    update(id: string, updateDiscussionPostDto: UpdateDiscussionPostDto, user: any): Promise<DiscussionPost>;
    remove(id: string, user: any): Promise<void>;
}
