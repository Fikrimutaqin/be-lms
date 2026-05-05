import { User } from '../../users/entities/user.entity';
import { Submission } from '../../submissions/entities/submission.entity';
import { QuizAnswer } from '../../quiz-answers/entities/quiz-answer.entity';
export declare class Grade {
    id: string;
    userId: string;
    user: User;
    submissionId: string;
    submission: Submission;
    quizAnswerId: string;
    quizAnswer: QuizAnswer;
    score: number;
    gradeLetter: string;
    feedback: string;
    gradedAt: Date;
    createdAt: Date;
    updatedAt: Date;
}
