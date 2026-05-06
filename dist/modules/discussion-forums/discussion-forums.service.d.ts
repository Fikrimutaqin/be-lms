import { Repository } from 'typeorm';
import { DiscussionForum } from './entities/discussion-forum.entity';
import { CreateDiscussionForumDto } from './dto/create-discussion-forum.dto';
import { UpdateDiscussionForumDto } from './dto/update-discussion-forum.dto';
export declare class DiscussionForumsService {
    private readonly forumRepository;
    constructor(forumRepository: Repository<DiscussionForum>);
    create(createDiscussionForumDto: CreateDiscussionForumDto): Promise<DiscussionForum>;
    findAll(): Promise<{
        message: string;
        data: DiscussionForum[];
    }>;
    findByCourse(courseId: string): Promise<{
        message: string;
        data: DiscussionForum[];
    }>;
    findOne(id: string): Promise<DiscussionForum>;
    update(id: string, updateDiscussionForumDto: UpdateDiscussionForumDto): Promise<DiscussionForum>;
    remove(id: string): Promise<void>;
}
