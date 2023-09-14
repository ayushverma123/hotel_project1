
import { Quiz } from 'src/entities/quiz.schema';
import { createQuizQuestionDto } from './quizQuestion-dto';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { QQuestion } from 'src/entities/quizQuestion.schema';
import { createQuizDto } from '../quiz/quiz-dto';

@Injectable()
export class QQuestionService {
  constructor(@InjectModel('QQuestion') private readonly qquestionModel: Model<QQuestion>,
    @InjectModel('Quiz') private readonly quizModel: Model<Quiz>) { }

  async createQuestion(questionDto: createQuizQuestionDto): Promise<QQuestion> {
    const createdQuestion = new this.qquestionModel(questionDto);
    return createdQuestion.save();
  }

  async createQues(questionDto: createQuizQuestionDto) {
    const { quizid, ...questionData } = questionDto;
    const quiz = await this.quizModel.findById(quizid);
    if (!quiz) {
      throw new Error('Invalid quizId');
    }

    const newQuestionData = {
      ...questionData,
      quiz: quiz.title,

    };

    // No existing customer found, create a new one
    const createdQuestion = await this.qquestionModel.create(newQuestionData);
    await createdQuestion.save();
    return {
      code: 200,
      message: 'Question created successfully',
      status: 'success',
      data: createdQuestion,
    };

  }
  async getQuestions(): Promise<QQuestion[]> {
    return this.qquestionModel.find().exec();
  }

  async getQuestionById(id: string): Promise<QQuestion | null> {
    return this.qquestionModel.findById(id).exec();
  }

  async updateQuestion(id: string, updateDto: createQuizQuestionDto): Promise<QQuestion | null> {
    return this.qquestionModel.findByIdAndUpdate(id, updateDto, { new: true }).exec();
  }

  async deleteQuestion(id: string): Promise<QQuestion | null> {
    return this.qquestionModel.findByIdAndDelete(id).exec();
  }
}