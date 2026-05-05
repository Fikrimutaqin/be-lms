import { SubmissionStatus } from '../entities/submission.entity';
export declare class CreateSubmissionDto {
    assignmentId: string;
    userId: string;
    submissionUrl?: string;
    submissionContent?: string;
    status?: SubmissionStatus;
}
