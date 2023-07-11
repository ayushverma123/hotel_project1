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

@Module({
  imports: [MongooseModule.forRoot("mongodb+srv://ayushv657:gkczp9LJXpkYnN7u@cluster0.stthbi5.mongodb.net/mydatabase?retryWrites=true&w=majority"),
  MongooseModule.forFeature([{ name: 'Customer', schema: CustomerSchema  }, { name: 'Hotel', schema: HotelSchema }, { name: 'Booking', schema: BookingSchema}]),
  AuthModule,
  CustomerModule, HotelModule, BookingModule, FrontendCustomerModule],
  controllers: [BookingController],
  providers: [BookingService]
})
export class AppModule {}
