
import { Option } from 'src/entities/quizQuestionOptions.schema';
import { createOptionDto } from './createOption-dto';
 
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { QQuestion } from 'src/entities/quizQuestion.schema';
import { createQuizDto } from '../quiz/quiz-dto';

@Injectable()
export class OptionService {
  constructor(@InjectModel('Option') private readonly optionModel: Model<Option>,
             @InjectModel('QQuestion') private readonly qquestionModel: Model<QQuestion>) {}

  async createOption(optionDto: createOptionDto): Promise<Option> {
    const createdOption =  new this.optionModel(optionDto);
    return createdOption.save();
  }

  async createOpt(optionDto: createOptionDto) {
    const { quizquestionid, ...optionData } = optionDto;

    const quizQuestion = await this.qquestionModel.findById(quizquestionid);

    if (!quizQuestion) {
        throw new Error('Invalid quizquestionid');
    }

    // Rest of your logic to create the option
    // ...

    const createdOption = await this.optionModel.create({
        ...optionData,
        quizquestion: quizQuestion.questiontext, // Store the associated question text
    });

    return {
        code: 200,
        message: 'Option created successfully',
        status: 'success',
        data: createdOption,
    };
}

  async getOptions(): Promise<Option[]> {
    return this.optionModel.find().exec()
  }

  async getOptionById(id: string): Promise<Option | null> {
    return this.optionModel.findById(id).exec();
  }

  async updateOption(id: string, updateDto: createOptionDto): Promise<Option | null> {
    return this.optionModel.findByIdAndUpdate(id, updateDto, { new: true }).exec();
  }

  async deleteOption(id: string): Promise<Option | null> {
    return this.optionModel.findByIdAndDelete(id).exec();
  }
}