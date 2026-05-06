import { DiscussionForumsService } from './discussion-forums.service';
import { CreateDiscussionForumDto } from './dto/create-discussion-forum.dto';
import { UpdateDiscussionForumDto } from './dto/update-discussion-forum.dto';
import { DiscussionForum } from './entities/discussion-forum.entity';
export declare class DiscussionForumsController {
    private readonly discussionForumsService;
    constructor(discussionForumsService: DiscussionForumsService);
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
