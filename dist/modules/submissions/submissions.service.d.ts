import { Repository } from 'typeorm';
import { Submission } from './entities/submission.entity';
import { CreateSubmissionDto } from './dto/create-submission.dto';
import { UpdateSubmissionDto } from './dto/update-submission.dto';
export declare class SubmissionsService {
    private readonly submissionRepository;
    constructor(submissionRepository: Repository<Submission>);
    create(createSubmissionDto: CreateSubmissionDto): Promise<Submission>;
    findAll(): Promise<Submission[]>;
    findByAssignment(assignmentId: string): Promise<Submission[]>;
    findByUser(userId: string): Promise<Submission[]>;
    findOne(id: string): Promise<Submission>;
    update(id: string, updateSubmissionDto: UpdateSubmissionDto): Promise<Submission>;
    remove(id: string): Promise<void>;
}
