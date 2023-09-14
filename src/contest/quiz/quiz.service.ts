import { Quiz } from 'src/entities/quiz.schema';                                             
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { QQuestion } from 'src/entities/quizQuestion.schema';
import { createQuizDto } from './quiz-dto';

@Injectable()
export class QuizService {
  constructor(@InjectModel('Quiz') private readonly quizModel: Model<Quiz>) {}

  async createQuestion(quizDto: createQuizDto): Promise<Quiz> {
    const createdQuestion = new this.quizModel(quizDto);
    return createdQuestion.save();
  }

  async getQuiz(): Promise<Quiz[]> {
    return this.quizModel.find().exec();
  }

  async getQuizbyid(id: string): Promise<Quiz | null> {
    return this.quizModel.findById(id).exec();
  }

  async updateQuiz(id: string, updateDto: createQuizDto): Promise<Quiz | null> {
    return this.quizModel.findByIdAndUpdate(id, updateDto, { new: true }).exec();
  }

  async deleteQuiz(id: string): Promise<Quiz | null> {
    return this.quizModel.findByIdAndDelete(id).exec();
  }
}