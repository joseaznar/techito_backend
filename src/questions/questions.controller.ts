import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger/dist/decorators/api-operation.decorator';
import { ApiTags } from '@nestjs/swagger/dist/decorators/api-use-tags.decorator';
import { CreateQuestionDto } from './create-question.dto';
import { QuestionsService } from './questions.service';
import { UpdateQuestionDto } from './update-question.dto';

@ApiTags('Questions')
@Controller('questions')
export class QuestionsController {
  constructor(private readonly service: QuestionsService) {}

  @ApiOperation({
    summary: 'Find all questions',
    description: 'Retrieves list of questions.',
  })
  // #endregion
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
}
