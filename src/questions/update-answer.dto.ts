import { ApiProperty } from '@nestjs/swagger';
import { QuestionAnswer } from './question-answer.entity';

export class UpdateAnswerDto {
    @ApiProperty({
        description: "The answers to the questions for a particular response.",
        type: QuestionAnswer,
        required: false,
        isArray: true,
      })
      answers?: QuestionAnswer[];
    
      @ApiProperty({
        description: 'The user s email.',
        example: 'hello@example.com',
        required: false,
      })
      email?: string;
    
      @ApiProperty({
        description: 'The user s phone.',
        example: '5544543421',
        required: false,
        maxLength: 10,
        minLength: 10,
      })
      phone?: string;
    
      @ApiProperty({
        description: 'The user s carbon footprint computed as tons of CO2 emited per year.',
        example: '4433.1',
        required: false,
      })
      carbonFootprint?: number;
}
