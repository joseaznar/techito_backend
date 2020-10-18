import { HttpService, Injectable } from '@nestjs/common';
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
    private httpService: HttpService,
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

  async create(createAnswerDto: CreateAnswerDto): Promise<Answer> {
    const answer = new Answer();
    answer.answers = createAnswerDto.answers;
    answer.carbonFootprint = createAnswerDto.carbonFootprint;
    answer.email = createAnswerDto.email;
    answer.phone = createAnswerDto.phone;

    let savedAnswer = await this.repository.save(answer);

    // to retreive the complete questions object
    savedAnswer = await this.findOne(`${savedAnswer.id}`);

    let luz = '0',
      gas = '0',
      personas = '1',
      avion = '0',
      coche = '0',
      alimentacion = 'Mix';

    savedAnswer.answers.forEach(ans => {
      console.log('--------------');
      console.log(ans);
      console.log('--------------');
      if (ans.content.includes('luz')) {
        luz = ans.content;
      } else if (ans.content.includes('gas')) {
        gas = ans.content;
      } else if (ans.content.includes('personas')) {
        personas = ans.content;

        if (personas === '0') {
          personas = '1';
        }
      } else if (ans.content.includes('avion')) {
        avion = ans.content;
      } else if (ans.content.includes('coche')) {
        coche = ans.content;
      } else if (ans.content.includes('alimentacion')) {
        alimentacion = ans.content;

        if (alimentacion.includes('diario')) {
          alimentacion = 'Carne';
        } else if (alimentacion.includes('regularmente')) {
          alimentacion = 'Mix';
        } else if (alimentacion.includes('Vegetariano')) {
          alimentacion = 'Vegetariano';
        } else {
          alimentacion = 'Vegano';
        }
      }
    });

    const lambdaUrl = `https://htd5wfpajd.execute-api.us-east-2.amazonaws.com/dev/get-co2?luz=${luz}&gas=${gas}&personas=${personas}&avion=${avion}&coche=${coche}&alimentacion=${alimentacion}`;

    console.log('******************');
    console.log(lambdaUrl);

    const response = await this.httpService.get(lambdaUrl).toPromise();

    console.log(response.data);
    console.log('******************');

    await this.update(`${savedAnswer.id}`, {
      carbonFootprint: response.data.co2_kg_anual,
    });

    savedAnswer = await this.findOne(`${savedAnswer.id}`);

    console.log('++++++++++++++++++');
    console.log(savedAnswer);
    console.log('++++++++++++++++++');

    return savedAnswer;
  }

  async update(id: string, updateAnswerDto: UpdateAnswerDto): Promise<number> {
    const ans = await this.repository.update(id, updateAnswerDto);

    return ans.affected;
  }
}
