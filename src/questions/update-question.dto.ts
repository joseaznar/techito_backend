import { ApiProperty } from '@nestjs/swagger';
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
}
