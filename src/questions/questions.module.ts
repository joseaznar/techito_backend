import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QuestionOption } from './question-option.entity';
import { Question } from './question.entity';
import { QuestionsController } from './questions.controller';
import { QuestionsService } from './questions.service';

@Module({
  imports: [TypeOrmModule.forFeature([Question, QuestionOption])],
  providers: [QuestionsService],
  controllers: [QuestionsController],
  exports: [TypeOrmModule]
})
export class QuestionsModule {}