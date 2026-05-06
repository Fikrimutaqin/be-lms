import { Repository } from 'typeorm';
import { Submission } from './entities/submission.entity';
import { CreateSubmissionDto } from './dto/create-submission.dto';
import { UpdateSubmissionDto } from './dto/update-submission.dto';
export declare class SubmissionsService {
    private readonly submissionRepository;
    constructor(submissionRepository: Repository<Submission>);
    create(createSubmissionDto: CreateSubmissionDto, user: any): Promise<Submission>;
    findAll(): Promise<{
        message: string;
        data: Submission[];
    }>;
    findByAssignment(assignmentId: string): Promise<{
        message: string;
        data: Submission[];
    }>;
    findByUser(userId: string): Promise<{
        message: string;
        data: Submission[];
    }>;
    findOne(id: string): Promise<Submission>;
    update(id: string, updateSubmissionDto: UpdateSubmissionDto): Promise<Submission>;
    remove(id: string): Promise<void>;
}
