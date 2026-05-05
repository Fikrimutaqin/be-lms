import { IsString, IsNumber, IsUUID, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateQuizAnswerDto {
  @ApiProperty({ example: 'uuid-of-question' })
  @IsUUID()
  quizQuestionId: string;

  @ApiProperty({ example: 'uuid-of-user' })
  @IsUUID()
  userId: string;

  @ApiProperty({ example: 'Paris' })
  @IsString()
  answerText: string;

  @ApiProperty({ example: 0 })
  @IsNumber()
  @Min(0)
  score: number;
}
