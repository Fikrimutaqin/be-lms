import { IsString, IsEnum, IsNumber, IsUUID, IsInt, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { QuestionType } from '../entities/quiz-question.entity';

export class CreateQuizQuestionDto {
  @ApiProperty({ example: 'uuid-of-quiz' })
  @IsUUID()
  quizId: string;

  @ApiProperty({ example: 'What is the capital of France?' })
  @IsString()
  questionText: string;

  @ApiProperty({ enum: QuestionType, example: QuestionType.MULTIPLE_CHOICE })
  @IsEnum(QuestionType)
  questionType: QuestionType;

  @ApiProperty({ example: 10 })
  @IsNumber()
  @Min(0)
  points: number;

  @ApiProperty({ example: 1 })
  @IsInt()
  @Min(0)
  sequenceOrder: number;
}
