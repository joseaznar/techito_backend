import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionOption } from './question-option.entity';
import { QuestionsOptionService } from './question-option.service';
import { Question } from './question.entity';
import { QuestionsController } from './questions.controller';
import { QuestionsService } from './questions.service';

@Module({
  imports: [TypeOrmModule.forFeature([Question, QuestionOption])],
  providers: [QuestionsService, QuestionsOptionService],
  controllers: [QuestionsController],
  exports: [TypeOrmModule]
})
export class QuestionsModule {}