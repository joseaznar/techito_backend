import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm/dist/typeorm.module';
import { Connection } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Question } from './questions/question.entity';
import { QuestionsController } from './questions/questions.controller';
import { QuestionsService } from './questions/questions.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: 3306,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Question],
      synchronize: true,
    }),
  ],
  controllers: [AppController, QuestionsController],
  providers: [AppService, QuestionsService],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
