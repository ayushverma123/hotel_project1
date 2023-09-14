import { NotFoundException, BadRequestException } from '@nestjs/common/exceptions';
import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { CreateAnswerDto } from './createAnswer-dto';
import { AnswerService } from './answer.service';
import { Answer } from 'src/entities/answer.schema'; // Import your answer model

@Controller('answers')
export class AnswerController {
  constructor(private readonly answerService: AnswerService) { }
  
  @Get(':userId/quizzes-played')
  async getQuizzesPlayedByUser(@Param('userId') userId: string) {
    try {
      const quizzesPlayed = await this.answerService.getQuizzesPlayed(userId);

      return {
        code: 200,
        message: 'Quizzes played by user retrieved successfully',
        status: 'success',
        data: quizzesPlayed,
      };
    } catch (error) {
      return {
        code: 500, // Adjust the status code as needed
        message: 'An error occurred while retrieving quizzes played by user',
        status: 'error',
      };
    }
  }

 
  @Get('participant-summary/:participantId/:quizId')
  async getParticipantSummary(
    @Param('participantId') participantId: string,
    @Param('quizId') quizId: string,
  ) {
    try {
      const totalParticipants = await this.answerService.getTotalParticipants(quizId);
      const totalCorrect = await this.answerService.getTotalCorrectQuestions(participantId);
      const totalAttempted = await this.answerService.getTotalAttemptedQuestions(participantId, quizId);
      const totalUnattempted = await this.answerService.getTotalUnattemptedQuestions(participantId, quizId);
      const quiz = await this.answerService.getQuizById(quizId);
      const totalQuestions = quiz.totalquestion;
      const totalIncorrect = totalQuestions - totalCorrect;

      return {
        code: 200,
        message: 'Participant summary retrieved successfully',
        status: 'success',
        data: {
          //totalParticipants,
          totalCorrect,
          totalIncorrect,
          totalAttempted,
          totalUnattempted,
          totalQuestions,
        },
      };
    } catch (error) {
      return {
        code: 500, // Adjust the status code as needed
        message: 'An error occurred while retrieving participant summary',
        status: 'error',
      };
    }
  } 

  @Get('total-unattempted-questions/:participantId/:quizId')
  async getTotalUnattemptedQuestions(
    @Param('participantId') participantId: string,
    @Param('quizId') quizId: string,
  ) {
    try {
      const totalUnattempted = await this.answerService.getTotalUnattemptedQuestions(participantId, quizId);

      return {
        code: 200,
        message: 'Total unattempted questions retrieved successfully',
        status: 'success',
        data: {
          totalUnattempted,
        },
      };
    } catch (error) {
      return {
        code: 500, // Adjust the status code as needed
        message: 'An error occurred while retrieving total unattempted questions',
        status: 'error',
      };
    }
  }


  @Get('total-attempted-questions/:participantId/:quizId')
  async getTotalAttemptedQuestions(
    @Param('participantId') participantId: string,
    @Param('quizId') quizId: string,
  ) {
    try {
      const totalAttempted = await this.answerService.getTotalAttemptedQuestions(participantId, quizId);

      return {
        code: 200,
        message: 'Total attempted questions retrieved successfully',
        status: 'success',
        data: {
          totalAttempted,
        },
      };
    } catch (error) {
      return {
        code: 500, // Adjust the status code as needed
        message: 'An error occurred while retrieving total attempted questions',
        status: 'error',
      };
    }
  }

  @Post('submit-answer')
  async submitAnswer(@Body() createAnswerDto: CreateAnswerDto) {
    try {
      await this.answerService.submitAnswer(createAnswerDto);

      return {
        code: 200,
        message: 'Answer submitted successfully',
        status: 'success',
      };
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        return {
          code: error.getStatus(),
          message: error.message,
          status: 'error',
        };
      }
      // Handle other errors if needed

      throw error; // For unhandled errors
    }
  }
   


  @Get('total-correct-questions/:participantId')
  async getTotalCorrectQuestions(@Param('participantId') participantId: string) {
    try {
      const totalCorrect = await this.answerService.getTotalCorrectQuestions(participantId);

      return {
        code: 200,
        message: 'Total correct questions retrieved successfully',
        status: 'success',
        data: {
          totalCorrect,
        },
      };
    } catch (error) {
      return {
        code: 500, // Adjust the status code as needed
        message: 'An error occurred while retrieving total correct questions',
        status: 'error',
      };
    }
  }

  @Get('total-participants/:quizId')
  async getTotalParticipants(@Param('quizId') quizId: string) {
    try {
      const totalParticipants = await this.answerService.getTotalParticipants(quizId);

      return {
        code: 200,
        message: 'Total participants retrieved successfully',
        status: 'success',
        data: {
          totalParticipants,
        },
      };
    } catch (error) {
      return {
        code: 500, // Adjust the status code as needed
        message: 'An error occurred while retrieving total participants',
        status: 'error',
      };
    }
  }


  @Get('total-incorrect-questions/:participantId/:quizId')
  async getTotalIncorrectQuestions(
    @Param('participantId') participantId: string,
    @Param('quizId') quizId: string,
  ) {
    try {
      const totalIncorrect = await this.answerService.getTotalIncorrectQuestions(participantId, quizId);

      return {
        code: 200,
        message: 'Total incorrect questions retrieved successfully',
        status: 'success',
        data: {
          totalIncorrect,
        },
      };
    } catch (error) {
      return {
        code: 500, // Adjust the status code as needed
        message: 'An error occurred while retrieving total incorrect questions',
        status: 'error',
      };
    }
  }
}