export declare class CreateQuizDto {
    courseId: string;
    title: string;
    description?: string;
    totalScore: number;
    timeLimitMinutes?: number;
    shuffleQuestions?: boolean;
}
