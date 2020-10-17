import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist/common/typeorm.decorators';
import { Repository } from 'typeorm';
import { CreateOptionDto } from './create-option.dto';
import { QuestionOption } from './question-option.entity';
import { UpdateOptionDto } from './update-option.dto';

@Injectable()
export class QuestionsOptionService {
  constructor(
    @InjectRepository(QuestionOption)
    private repository: Repository<QuestionOption>,
  ) {}

  findAll(): Promise<QuestionOption[]> {
    return this.repository.find();
  }

  findOne(id: string): Promise<QuestionOption> {
    return this.repository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  create(createQuestionOptionDto: CreateOptionDto): Promise<QuestionOption> {
    const option = new QuestionOption();
    option.content = createQuestionOptionDto.content;
    option.question = createQuestionOptionDto.question;

    return this.repository.save(option);
  }

  async update(
    id: string,
    updateOptionDto: UpdateOptionDto,
  ): Promise<QuestionOption> {
    const option = await this.findOne(id);

    await this.repository.update(id, updateOptionDto);

    return option;
  }
}
