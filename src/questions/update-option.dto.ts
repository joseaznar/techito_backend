import { ApiProperty } from '@nestjs/swagger';
import { Question } from './question.entity';

export class UpdateOptionDto {
    @ApiProperty({
        description: "The question option content.",
        required: false,
    })
    content?: string;

    @ApiProperty({
        description: `The options question.`,
        required: false,
        type: Question
    })
    question?: Question;
}
