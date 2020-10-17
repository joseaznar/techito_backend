import { ApiProperty } from '@nestjs/swagger';
import { QuestionType } from './question.entity';

export class CreateQuestionDto {
    @ApiProperty({
        description: "The question content.",
        example: 'What is your name?',
        required: true,
    })
    content: string;

    @ApiProperty({
        description: "The question's type.",
        enum: QuestionType,
        required: true,
    })
    type: QuestionType;

    @ApiProperty({
        description: `The options to answer this questions.`,
        example: [
            '0-500',
            '500-1000',
            '1000+',
        ],
        required: false,
    })
    options?: string[];
}