import { DiscussionPostsService } from './discussion-posts.service';
import { CreateDiscussionPostDto } from './dto/create-discussion-post.dto';
import { UpdateDiscussionPostDto } from './dto/update-discussion-post.dto';
import { DiscussionPost } from './entities/discussion-post.entity';
export declare class DiscussionPostsController {
    private readonly discussionPostsService;
    constructor(discussionPostsService: DiscussionPostsService);
    create(createDiscussionPostDto: CreateDiscussionPostDto): Promise<DiscussionPost>;
    findAll(): Promise<DiscussionPost[]>;
    findByForum(forumId: string): Promise<DiscussionPost[]>;
    findByUser(userId: string): Promise<DiscussionPost[]>;
    findOne(id: string): Promise<DiscussionPost>;
    update(id: string, updateDiscussionPostDto: UpdateDiscussionPostDto): Promise<DiscussionPost>;
    remove(id: string): Promise<void>;
}
