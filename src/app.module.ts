import { HttpExceptionFilter } from './hotel/exceptions/httpFilter-exception';
import { OtpSchema } from './entities/otp.schema';
import { HotelModule } from './hotel/hotel.module';
import { HotelSchema } from './entities/hotel.schema';
import { Hotel } from './entities/hotel.schema';
import { CustomerSchema } from './entities/customer.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { CustomerService } from './customer/customer.service';
import { CustomerController } from './customer/customer.controller';
import { AuthController } from './auth/auth.controller';
import { JwtService } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';
import { AuthService } from './auth/auth.service';
import { CustomerModule } from './customer/customer.module';
import { BookingSchema } from './entities/booking.schema';
import { BookingController } from './booking/booking.controller';
import { BookingService } from './booking/booking.service';
import { BookingModule } from './booking/booking.module';
import { FrontendCustomerModule } from './frontend_customer/frontend_customer.module';
import { APP_FILTER } from '@nestjs/core';
import { ContestModule, } from './contest/quizQuestion/contest.module';
import { UserService } from './contest/user/user.service';
import { UserController } from './contest/user/user.controller';
import { OptionService } from './contest/quizQuestionOption/options.service';

@Module({
  imports: [MongooseModule.forRoot("mongodb+srv://ayushv657:gkczp9LJXpkYnN7u@cluster0.stthbi5.mongodb.net/mydatabase?retryWrites=true&w=majority"),   
    AuthModule,
    CustomerModule, HotelModule, BookingModule, FrontendCustomerModule, ContestModule], 
  controllers: [ ],
  providers: [{   
    provide: APP_FILTER,
    useClass: HttpExceptionFilter,
  },]
})
export class AppModule { }
