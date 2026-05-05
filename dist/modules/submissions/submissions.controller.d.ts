import { SubmissionsService } from './submissions.service';
import { CreateSubmissionDto } from './dto/create-submission.dto';
import { UpdateSubmissionDto } from './dto/update-submission.dto';
import { Submission } from './entities/submission.entity';
export declare class SubmissionsController {
    private readonly submissionsService;
    constructor(submissionsService: SubmissionsService);
    create(createSubmissionDto: CreateSubmissionDto): Promise<Submission>;
    findAll(): Promise<Submission[]>;
    findByAssignment(assignmentId: string): Promise<Submission[]>;
    findByUser(userId: string): Promise<Submission[]>;
    findOne(id: string): Promise<Submission>;
    update(id: string, updateSubmissionDto: UpdateSubmissionDto): Promise<Submission>;
    remove(id: string): Promise<void>;
}
