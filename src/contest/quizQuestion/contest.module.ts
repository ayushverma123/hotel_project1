import { CustomerSchema } from 'src/entities/customer.schema';
import { OptionSchema } from 'src/entities/quizQuestionOptions.schema';
import { QuizSchema } from 'src/entities/quiz.schema';
import { QQuestionSchema } from 'src/entities/quizQuestion.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { QQuestionController } from './quizQuestion.controller';
import { Options } from '@nestjs/common/decorators';
import { QQuestionService } from './quizQuestion.service';
import { QuizController } from '../quiz/quiz.controller';
import { QuizService } from '../quiz/quiz.service';
import { UserController } from '../user/user.controller';
import { UserService } from '../user/user.service';
import { UserSchema } from 'src/entities/user.schema';
import { OptionController } from '../quizQuestionOption/options.controller';
import { OptionService } from '../quizQuestionOption/options.service';
import { AnswerController } from '../answer/answer.controller';
import { AnswerSchema } from 'src/entities/answer.schema';
import { AnswerService } from '../answer/answer.service';
import { AdminController } from '../admin/admin.controller';


@Module({
  imports: [MongooseModule.forFeature([{ name: 'QQuestion', schema: QQuestionSchema }, { name: 'User', schema: UserSchema }, { name: 'Quiz', schema: QuizSchema },{ name: 'Option', schema: OptionSchema },{ name: 'Answer', schema: AnswerSchema },{ name: 'Customer', schema: CustomerSchema }]),],
  controllers: [QQuestionController, QuizController, UserController, OptionController, AnswerController, AdminController],
  providers: [QQuestionService, QuizService, UserService, OptionService, AnswerService],
  exports: []
})
export class ContestModule { }
