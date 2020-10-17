import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Question } from './question.entity';

@Entity()
export class QuestionOption {
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({
        description: "The question option content.",
        example: '0 to 500',
        required: true,
    })
    @Column()
    content: string;

    @ManyToOne(() => Question, question => question.options)
    question: Question;
}
