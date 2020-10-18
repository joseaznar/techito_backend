import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AnswerService } from './answer.service';
import { Answer } from './answers.entity';
import { QuestionAnswer } from './question-answer.entity';
import { QuestionOption } from './question-option.entity';
import { QuestionsOptionService } from './question-option.service';
import { Question } from './question.entity';
import { QuestionsController } from './questions.controller';
import { QuestionsService } from './questions.service';

@Module({
  imports: [TypeOrmModule.forFeature([Question, QuestionOption, QuestionAnswer, Answer])],
  providers: [QuestionsService, QuestionsOptionService, AnswerService],
  controllers: [QuestionsController],
  exports: [TypeOrmModule]
})
export class QuestionsModule {}