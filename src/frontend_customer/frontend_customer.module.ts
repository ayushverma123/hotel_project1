import { OtpSchema } from 'src/entities/otp.schema';
import { CustomerSchema } from 'src/entities/customer.schema';
import { BookingSchema } from 'src/entities/booking.schema';
import { HotelSchema } from 'src/entities/hotel.schema';
import { Hotel } from 'src/entities/hotel.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { FrontendController } from './frontend_customer.controller';
import { HotelService } from 'src/hotel/hotel.service';
import { BookingService } from 'src/booking/booking.service';
import { CustomerService } from 'src/customer/customer.service';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';


@Module({
  imports: [MongooseModule.forRoot("mongodb+srv://ayushv657:gkczp9LJXpkYnN7u@cluster0.stthbi5.mongodb.net/mydatabase?retryWrites=true&w=majority"),
  MongooseModule.forFeature([{ name: 'Hotel', schema: HotelSchema }, { name: 'Booking', schema: BookingSchema }, { name: 'Customer', schema: CustomerSchema }, { name: 'Otp', schema: OtpSchema }]),],
  controllers: [FrontendController],
  providers: [HotelService, BookingService, CustomerService, AuthService, JwtService],
  exports: []
})
export class FrontendCustomerModule { }
