import { Quiz } from '../../quizzes/entities/quiz.entity';
export declare enum QuestionType {
    MULTIPLE_CHOICE = "multiple-choice",
    ESSAY = "essay",
    TRUE_FALSE = "true-false",
    SHORT_ANSWER = "short-answer"
}
export declare class QuizQuestion {
    id: string;
    quizId: string;
    quiz: Quiz;
    questionText: string;
    questionType: QuestionType;
    points: number;
    sequenceOrder: number;
    createdAt: Date;
    updatedAt: Date;
}
