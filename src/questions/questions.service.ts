import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist/common/typeorm.decorators';
import { Repository } from 'typeorm';
import { CreateQuestionDto } from './create-question.dto';
import { Question } from './question.entity';
import { UpdateQuestionDto } from './update-question.dto';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Question)
    private repository: Repository<Question>,
  ) {}

  findAll(): Promise<Question[]> {
    return this.repository.find();
  }

  findOne(id: string): Promise<Question> {
    return this.repository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  create(createQuestionDto: CreateQuestionDto): Promise<Question> {
    const question = new Question();
    question.content = createQuestionDto.content;
    question.type = createQuestionDto.type;
    question.options = createQuestionDto.options;

    return this.repository.save(question);
  }

  async update(
    id: string,
    updateQuestionDto: UpdateQuestionDto,
  ): Promise<Question> {
    const question = await this.findOne(id);

    await this.repository.update(id, updateQuestionDto);

    return question
  }
}
