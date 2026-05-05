import { User } from '../../users/entities/user.entity';
import { QuizQuestion } from '../../quiz-questions/entities/quiz-question.entity';
export declare class QuizAnswer {
    id: string;
    quizQuestionId: string;
    quizQuestion: QuizQuestion;
    userId: string;
    user: User;
    answerText: string;
    score: number;
    answeredAt: Date;
    createdAt: Date;
}
