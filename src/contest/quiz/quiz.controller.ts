import { Quiz } from 'src/entities/quiz.schema';  
import { QuizService } from './quiz.service';
import { createQuizQuestionDto } from '../quizQuestion/quizQuestion-dto';
import { Controller, Post, Get, Param, Put, Delete, Body } from '@nestjs/common';
import { QQuestionService } from '../quizQuestion/quizQuestion.service';
import { QQuestion } from 'src/entities/quizQuestion.schema';
import { createQuizDto } from './quiz-dto';

@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Post()
  async createQuiz(@Body() quizDto: createQuizDto): Promise<Quiz> {
    return this.quizService.createQuestion(quizDto);
  }

  @Get()
  async getQuiz(): Promise<Quiz[]> {
    return this.quizService.getQuiz();
  }

  @Get(':id')
  async getQuizbyid(@Param('id') id: string): Promise<Quiz | null> {
    return this.quizService.getQuizbyid(id);
  }

  @Put(':id')
  async updateQuiz(
    @Param('id') id: string,
    @Body() updateDto: createQuizDto
  ): Promise<Quiz | null> {
    return this.quizService.updateQuiz(id, updateDto);
  }

  @Delete(':id')
  async deleteQuiz(@Param('id') id: string): Promise<Quiz | null> {
    return this.quizService.deleteQuiz(id);
  }
}