
import { BookingSchema } from '../entities/booking.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { BookingController } from './booking.controller';
import { BookingService } from './booking.service';
import { CustomerSchema } from 'src/entities/customer.schema';


@Module({
  imports: [MongooseModule.forFeature([{ name: 'Booking', schema: BookingSchema }, { name: 'Customer', schema: CustomerSchema }]),],
  controllers: [BookingController],
  providers: [BookingService],
  exports: [BookingService]
})
export class BookingModule { }
