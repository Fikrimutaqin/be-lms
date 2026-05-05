import { Repository } from 'typeorm';
import { DiscussionPost } from './entities/discussion-post.entity';
import { CreateDiscussionPostDto } from './dto/create-discussion-post.dto';
import { UpdateDiscussionPostDto } from './dto/update-discussion-post.dto';
export declare class DiscussionPostsService {
    private readonly postRepository;
    constructor(postRepository: Repository<DiscussionPost>);
    create(createDiscussionPostDto: CreateDiscussionPostDto): Promise<DiscussionPost>;
    findAll(): Promise<DiscussionPost[]>;
    findByForum(forumId: string): Promise<DiscussionPost[]>;
    findByUser(userId: string): Promise<DiscussionPost[]>;
    findOne(id: string): Promise<DiscussionPost>;
    update(id: string, updateDiscussionPostDto: UpdateDiscussionPostDto): Promise<DiscussionPost>;
    remove(id: string): Promise<void>;
}
