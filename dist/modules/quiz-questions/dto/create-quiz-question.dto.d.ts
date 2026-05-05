import { QuestionType } from '../entities/quiz-question.entity';
export declare class CreateQuizQuestionDto {
    quizId: string;
    questionText: string;
    questionType: QuestionType;
    points: number;
    sequenceOrder: number;
}
