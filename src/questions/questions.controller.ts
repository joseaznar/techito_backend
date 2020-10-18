import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger/dist/decorators/api-operation.decorator';
import { ApiTags } from '@nestjs/swagger/dist/decorators/api-use-tags.decorator';
import { AnswerService } from './answer.service';
import { CreateAnswerDto } from './create-answer.dto';
import { CreateQuestionDto } from './create-question.dto';
import { QuestionsService } from './questions.service';
import { UpdateAnswerDto } from './update-answer.dto';
import { UpdateQuestionDto } from './update-question.dto';

@ApiTags('Questions')
@Controller('questions')
export class QuestionsController {
  constructor(
    private readonly service: QuestionsService,
    private readonly answerService: AnswerService,
    ) {}

  @ApiOperation({
    summary: 'Find all questions',
    description: 'Retrieves list of questions.',
  })
  @Get()
  async findAll() {
    return this.service.findAll();
  }

  @ApiOperation({
    summary: 'Create a new question',
    description: 'Creates a new question in the database.',
  })
  @Post()
  async create(@Body() body: CreateQuestionDto) {
    return this.service.create(body);
  }

  @ApiOperation({
    summary: 'Update a question',
    description: 'Updates the specified question fields in the database.',
  })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() body: UpdateQuestionDto,
  ) {
    return this.service.update(id, body);
  }

  @ApiOperation({
    summary: 'Get a question',
    description: 'Get the speciffied question.',
  })
  @Get(':id')
  async get(
    @Param('id') id: string,
  ) {
    return this.service.findOne(id);
  }

  @ApiOperation({
    summary: 'Delete a question',
    description: 'Delete the speciffied question.',
  })
  @Delete(':id')
  async delete(
    @Param('id') id: string,
  ) {
    return this.service.remove(id);
  }

  @ApiOperation({
    summary: 'Find all answers',
    description: 'Retrieves list of answers.',
  })
  @Get()
  async findAllAnswers() {
    return this.answerService.findAll();
  }

  @ApiOperation({
    summary: 'Create a new answer',
    description: 'Creates a new answer in the database.',
  })
  @Post('answer')
  async createAnswer(@Body() body: CreateAnswerDto) {
    return this.answerService.create(body);
  }

  @ApiOperation({
    summary: 'Update an answer',
    description: 'Updates the specified answer option fields in the database.',
  })
  @Patch('answer/:id')
  async updateAnswer(
    @Param('id') id: string,
    @Body() body: UpdateAnswerDto,
  ) {
    return this.answerService.update(id, body);
  }

  @ApiOperation({
    summary: 'Get an answer',
    description: 'Get the speciffied answer.',
  })
  @Get('answer/:id')
  async getAnswer(
    @Param('id') id: string,
  ) {
    return this.answerService.findOne(id);
  }
}
