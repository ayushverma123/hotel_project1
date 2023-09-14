import { NotFoundException } from '@nestjs/common';
import { Quiz } from 'src/entities/quiz.schema';
import { Option } from 'src/entities/quizQuestionOptions.schema';
import { QQuestion } from 'src/entities/quizQuestion.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAnswerDto } from './createAnswer-dto';
import { Answer } from 'src/entities/answer.schema'; // Import your answer model

@Injectable()
export class AnswerService {
  constructor(
    @InjectModel('Answer') private readonly answerModel: Model<Answer>,
    @InjectModel('QQuestion') private readonly qquestionModel: Model<QQuestion>,
    @InjectModel('Option') private readonly optionModel: Model<Option>,
    @InjectModel('Quiz') private readonly quizModel: Model<Quiz>,
  ) { }



  async getQuizzesPlayed(userId: string): Promise<any[]> {
    const answers = await this.answerModel.find({ quizparticipentid: userId });

    const quizzesPlayed = [];
    for (const answer of answers) {
      const quiz = await this.quizModel.findById(answer.quizid);
      if (quiz) {
        quizzesPlayed.push({
          quizId: quiz._id,
          quizTitle: quiz.title,
          participantAnswer: answer.optionChoice, // Or you can include more relevant information
        });
      }
    }

    return quizzesPlayed;
  }

  async getQuizById(quizId: string): Promise<Quiz> {
    const quiz = await this.quizModel.findById(quizId);
    if (!quiz) {
      throw new NotFoundException('Quiz not found');
    }
    return quiz;
  }

  async createAnswer(answerDto: CreateAnswerDto): Promise<Answer> {
    const createdAnswer = new this.answerModel(answerDto);
    return await createdAnswer.save();
  }
  // Your logic to create an answer
  // ...


  async submitAnswer(createAnswerDto: CreateAnswerDto) {
    const { quizquestionid, optionChoice, quizparticipentid } = createAnswerDto;
    
    const existingPart = await this.answerModel.findOne({
      quizparticipentid: createAnswerDto.quizparticipentid,
      quizquestionid: createAnswerDto.quizquestionid
 });

    if(existingPart)
    {
      throw new NotFoundException('Answer already submitted');
    }
    const question = await this.qquestionModel.findById(quizquestionid);
    console.log(question);
    if (!question || !question.options.some(option => option.choice === optionChoice)) {
      throw new NotFoundException('Question or option not found');
    }
    else {
      const createdAnswer = new this.answerModel(createAnswerDto);
      return await createdAnswer.save();
    }

  }

  async getUnattemptedQuestions(quizId: string, participantId: string): Promise<QQuestion[]> {
    // Retrieve all quiz questions for the given quiz
    const allQuizQuestions = await this.qquestionModel.find({ quizid: quizId });

    // Retrieve participant's attempted question IDs
    const participantAnswers = await this.answerModel.find({
      quizparticipentid: participantId,
    });

    const quiz = await this.quizModel.findById(quizId);
    if (!quiz) {
      throw new Error('quiz not found'); // Quiz not found
    }
    const totalQuestionsInQuiz = quiz.totalquestion;
    const attemptedQuestionIds = participantAnswers.map(answer => answer.quizquestionid);
    console.log(attemptedQuestionIds);
    // Filter unattempted questions
    const unattemptedQuestions = allQuizQuestions.filter(question => !attemptedQuestionIds.includes(question._id.toString()));
    console.log(unattemptedQuestions)
    return unattemptedQuestions;
  }

  async countUnattemptedQuestions(quizId: string, participantId: string): Promise<number> {
    // Retrieve all quiz questions for the given quiz
    const allQuizQuestions = await this.qquestionModel.find({ quizid: quizId });

    // Retrieve participant's attempted question IDs
    const participantAnswers = await this.answerModel.find({
      quizparticipentid: participantId,
    });

    // Count the attempted questions
    const attemptedQuestionCount = participantAnswers.length;

    // Retrieve total questions in the quiz
    const quiz = await this.quizModel.findById(quizId);
    if (!quiz) {
      return -1; // Quiz not found
    }
    const totalQuestionsInQuiz = quiz.totalquestion;

    // Calculate unattempted questions
    const unattemptedQuestionCount = totalQuestionsInQuiz - attemptedQuestionCount;

    return unattemptedQuestionCount;
  }

  async countAttemptedQuestions(participantId: string): Promise<number> {
    const participantAnswers = await this.answerModel.find({
      quizparticipentid: participantId,
    });

    const attemptedQuestionIds = participantAnswers.map(answer => answer.quizquestionid);
    const distinctAttemptedQuestionIds = [...new Set(attemptedQuestionIds)];

    return distinctAttemptedQuestionIds.length;
  }    

  async markCorrectAnswers(quizId: string, correctAnswers: { questionId: string, correctAnswer: string }[]): Promise<void> {
    const quiz = await this.quizModel.findById(quizId);
    if (!quiz) {
      throw new NotFoundException('Quiz not found');
    }

    // Update correct answers for questions
    for (const answer of correctAnswers) {
      const { questionId, correctAnswer } = answer;
      const question = await this.qquestionModel.findById(questionId);
      if (!question) {
        throw new NotFoundException(`Question with ID ${questionId} not found`);
      }

      // Update the correct answer for the question
      await this.qquestionModel.updateOne(
        { _id: questionId },
        { $set: { correctAnswer } }
      );
    }
  }

   
  async getTotalCorrectQuestions(participantId: string): Promise<number> {
    const participantAnswers = await this.answerModel.find({
      quizparticipentid: participantId,
    });
    console.log(participantAnswers);
    let totalCorrect = 0;

    for (const answer of participantAnswers) {
      console.log(answer);
      const correctAnswer = await this.getCorrectAnswer(answer.quizquestionid.toString());
      console.log(correctAnswer);
      if (correctAnswer === answer.optionChoice) {
        totalCorrect++;
      }
    }

    return totalCorrect;
  }


  async getCorrectAnswer(questionId: string): Promise<string> {
    const question = await this.qquestionModel.findById(questionId);
    console.log(question);
    if (!question) {
      throw new NotFoundException('Question not found');
    }

    return question.correctAnswer;
  }


  async getTotalIncorrectQuestions(participantId: string, quizId: string): Promise<number> {
    const totalQuestions = await this.quizModel.findById(quizId).select('totalquestions');
    if (!totalQuestions) {
      throw new NotFoundException('Quiz not found');
    }

    const totalCorrect = await this.getTotalCorrectQuestions(participantId);
    const totalIncorrect = totalQuestions.totalquestion - totalCorrect;

    return totalIncorrect;
  }


  async getTotalParticipants(quizId: string): Promise<number> {
    const totalParticipants = await this.answerModel.countDocuments({
      quizid: quizId,
    });

    return totalParticipants;
  }


  async getTotalAttemptedQuestions(participantId: string, quizId: string): Promise<number> {
    const totalAttempted = await this.answerModel.countDocuments({
      quizparticipentid: participantId,
      quizid: quizId,
    });

    return totalAttempted;
  }

  async getTotalUnattemptedQuestions(participantId: string, quizId: string): Promise<number> {
    const totalAttempted = await this.answerModel.countDocuments({
      quizparticipentid: participantId,
      quizid: quizId,
    });

    const quiz = await this.quizModel.findById(quizId).select('totalquestion');
    if (!quiz) {
      throw new NotFoundException('Quiz not found');
    }

    const totalUnattempted = quiz.totalquestion - totalAttempted;
    return totalUnattempted;
  }
}
