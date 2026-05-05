import { SubmissionStatus } from '../entities/submission.entity';
export declare class UpdateSubmissionDto {
    submissionUrl?: string;
    submissionContent?: string;
    status?: SubmissionStatus;
}
