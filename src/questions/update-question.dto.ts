import { ApiProperty } from '@nestjs/swagger';
import { QuestionOption } from './question-option.entity';
import { QuestionType } from './question.entity';

export class UpdateQuestionDto {
    @ApiProperty({
        description: "The question content.",
        example: 'What is your name?',
        required: false,
    })
    content?: string;

    @ApiProperty({
        description: "The question's type.",
        enum: QuestionType,
        required: false,
    })
    type?: QuestionType;

    @ApiProperty({
        description: "The question's options.",
        type: QuestionOption,
        required: false,
        isArray: true
    })
    options?: QuestionOption[];
}
