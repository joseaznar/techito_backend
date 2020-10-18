import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { QuestionAnswer } from './question-answer.entity';

@Entity()
export class Answer {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({
    description: "The answers to the questions for a particular response.",
    type: QuestionAnswer,
    required: true,
    isArray: true,
  })
  @OneToMany(
    type => QuestionAnswer,
    questionAnswer => questionAnswer.answer,
    { cascade: true, eager: true },
  )
  answers: QuestionAnswer[];

  @ApiProperty({
    description: 'The user s email.',
    example: 'hello@example.com',
    required: false,
  })
  @Column()
  email?: string;

  @ApiProperty({
    description: 'The user s phone.',
    example: '5544543421',
    required: false,
  })
  @Column({length: 10})
  phone?: string;

  @ApiProperty({
    description: 'The user s carbon footprint computed as tons of CO2 emited per year.',
    example: '4433.1',
    required: false,
  })
  @Column()
  carbonFootprint?: number;
}
