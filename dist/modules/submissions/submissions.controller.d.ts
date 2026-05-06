import { SubmissionsService } from './submissions.service';
import { CreateSubmissionDto } from './dto/create-submission.dto';
import { UpdateSubmissionDto } from './dto/update-submission.dto';
import { Submission } from './entities/submission.entity';
import type { Request } from 'express';
export declare class SubmissionsController {
    private readonly submissionsService;
    constructor(submissionsService: SubmissionsService);
    create(createSubmissionDto: CreateSubmissionDto, req: Request): Promise<Submission>;
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
