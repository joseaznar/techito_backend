import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Answer } from './answers.entity';
import { Question } from './question.entity';

@Entity()
export class QuestionAnswer {
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({
        description: "The question answer content.",
        example: '0 to 500',
        required: true,
    })
    @Column()
    content: string;

    @ManyToOne(() => Question, question => question.answers)
    question: Question;

    @ManyToOne(() => Answer, answer => answer.answers)
    answer: Answer;
}
