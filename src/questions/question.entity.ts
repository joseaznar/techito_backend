import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { QuestionOption } from './question-option.entity';

export enum QuestionType {
    MultipleChoice = 'MultipleChoice',
    Open = 'Open',
}

@Entity()
export class Question {
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({
        description: "The question content.",
        example: 'What is your name?',
        required: true,
    })
    @Column()
    content: string;

    @ApiProperty({
        description: "The question's type.",
        enum: QuestionType,
        required: true,
    })
    @Column()
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
    @OneToMany(type => QuestionOption, questionsOption => questionsOption.question)
    options?: QuestionOption[];
}
