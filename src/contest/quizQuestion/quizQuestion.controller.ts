import { createQuizQuestionDto } from './quizQuestion-dto';
import { Controller, Post, Get, Param, Put, Delete, Body } from '@nestjs/common';
import { QQuestionService } from './quizQuestion.service';
import { QQuestion } from 'src/entities/quizQuestion.schema';
import { createQuizDto } from '../quiz/quiz-dto';

@Controller('qquestions')
export class QQuestionController {
  constructor(private readonly qquestionService: QQuestionService) {}

  @Post()
  async createQuestion(@Body() questionDto: createQuizQuestionDto) {
    return this.qquestionService.createQues(questionDto);
  }

  @Get()
  async getQuestions(): Promise<QQuestion[]> {
    return this.qquestionService.getQuestions();
  }
  
  @Get(':id')
  async getQuestionById(@Param('id') id: string): Promise<QQuestion | null> {
    return this.qquestionService.getQuestionById(id);
  }

  
  @Put(':id')
  async updateQuestion(
    @Param('id') id: string,
    @Body() updateDto: createQuizQuestionDto
  ): Promise<QQuestion | null> {
    return this.qquestionService.updateQuestion(id, updateDto);
  }

  @Delete(':id')
  async deleteQuestion(@Param('id') id: string): Promise<QQuestion | null> {
    return this.qquestionService.deleteQuestion(id);
  }
}