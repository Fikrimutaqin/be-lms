import { User } from '../../users/entities/user.entity';
import { Assignment } from '../../assignments/entities/assignment.entity';
export declare enum SubmissionStatus {
    PENDING = "pending",
    SUBMITTED = "submitted",
    GRADED = "graded",
    RETURNED = "returned"
}
export declare class Submission {
    id: string;
    assignmentId: string;
    assignment: Assignment;
    userId: string;
    user: User;
    submissionUrl: string;
    submissionContent: string;
    status: SubmissionStatus;
    submittedAt: Date;
    createdAt: Date;
    updatedAt: Date;
}
