import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist/common/typeorm.decorators';
import { Repository } from 'typeorm';
import { Answer } from './answers.entity';
import { CreateAnswerDto } from './create-answer.dto';
import { UpdateAnswerDto } from './update-answer.dto';

@Injectable()
export class AnswerService {
  constructor(
    @InjectRepository(Answer)
    private repository: Repository<Answer>,
  ) {}

  async findAll(): Promise<Answer[]> {
    return await this.repository.find();
  }

  findOne(id: string): Promise<Answer> {
    return this.repository.findOne(id);
  }

  async remove(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  create(createAnswerDto: CreateAnswerDto): Promise<Answer> {
    const answer = new Answer();
    answer.answers = createAnswerDto.answers;
    answer.carbonFootprint = createAnswerDto.carbonFootprint;
    answer.email = createAnswerDto.email;
    answer.phone = createAnswerDto.phone;

    return this.repository.save(answer);
  }

  async update(
    id: string,
    updateAnswerDto: UpdateAnswerDto,
  ): Promise<Answer> {
    const answer = await this.findOne(id);

    await this.repository.update(id, updateAnswerDto);

    return answer
  }
}
