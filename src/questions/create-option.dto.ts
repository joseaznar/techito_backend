import { ApiProperty } from '@nestjs/swagger';
import { Question } from './question.entity';

export class CreateOptionDto {
    @ApiProperty({
        description: "The question option content.",
        required: true,
    })
    content: string;

    @ApiProperty({
        description: `The options question.`,
        required: true,
        type: Question
    })
    question: Question;
}
