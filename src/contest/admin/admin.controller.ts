import { AnswerService } from '../answer/answer.service';  
import { Body, Controller, Post, UseGuards } from '@nestjs/common';
 
@Controller('admin')
export class AdminController {
  constructor(private readonly answerService: AnswerService) {}


  @Post('mark-correct-answers')
  async markCorrectAnswers(@Body() requestBody: { quizId: string, correctAnswers: { questionId: string, correctAnswer: string }[] }) {
    try {
      const { quizId, correctAnswers } = requestBody;
      await this.answerService.markCorrectAnswers(quizId, correctAnswers);

      return {
        code: 200,
        message: 'Correct answers marked successfully',
        status: 'success',
      };
    } catch (error) {
      return {
        code: 500, // Adjust the status code as needed
        message: 'An error occurred while marking correct answers',
        status: 'error',
      };
    }
  }
}