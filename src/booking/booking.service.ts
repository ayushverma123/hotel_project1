import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Booking } from '../entities/booking.schema';
import { CreateBookingDto } from './dto/createBooking-dto';
import { Customer } from 'src/entities/customer.schema';
import { GetQueryDto } from './dto/query-dto';
import { CreateCustomerDto } from 'src/customer/dto/createCustomer-dto';

@Injectable()
export class BookingService {
  constructor(@InjectModel('Booking') private readonly bookingModel: Model<Booking>,
           @InjectModel('Customer') private readonly customerModel: Model<Customer>) {}
/*
  async createBooking(createBookingDto: CreateBookingDto): Promise<Booking> {
    const createdBooking = new this.bookingModel(createBookingDto);
    return createdBooking.save();
  }

  */
  
  async createBooking(createBookingDto: CreateBookingDto): Promise<Booking> {
    const { cusId, ...bookingData } = createBookingDto;
    const customer = await this.customerModel.findById(cusId);
    if (!customer) {
      throw new Error('Invalid customerId');
    }
    const newBlogData = {
      ...bookingData,
       cusId: customer._id,
       customerID: customer._id,
    };
    const createdBooking = new this.bookingModel(newBlogData);
    return createdBooking.save();
  }
  
  async getFilteredBookings(queryDto: GetQueryDto): Promise<Booking[]> {
    const { search, limit, pageNumber, pageSize, fromDate, toDate } = queryDto;
    const query = this.bookingModel.find();


    if (search) {
        query.or([
            { HotelName: { $regex: search, $options: 'i' } },
            { identity_type: { $regex: search, $options: 'i' } },
            { cus_email: { $regex: search, $options: 'i' } },
            { room_type: { $regex: search, $options: 'i' } },
            
        
        ]);
    }

    if (pageNumber && pageSize) {
        const skip = (pageNumber - 1) * pageSize;
        query.skip(skip).limit(pageSize);
    }

    return query.exec();

}


  async getAllBookings(): Promise<Booking[]> {
    return this.bookingModel.find().exec();
  }

  async getAllBooking(): Promise<Booking[]> {
    return this.bookingModel.aggregate([
      {
        $lookup: {
          from: 'customers', // Replace 'categories' with the actual collection name of your categories
          localField: 'cusId',
          foreignField: '_id',
          as: 'customer_email',
        },
      },
      {
        $unwind: {
          path: '$customer_email',
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          
          booking_date: 1,
          checkout_date: 1,
          room_alloted: 1,
          room_type: 1,
          identity_type: 1,
          customerID: 1,
          hotelID: 1,
          hote_id: 1,
          customer_email: '$customer_email.email',
      },}
    ]).exec();
  }

  async getBookingById(id: string): Promise<Booking | null> {
    return this.bookingModel.findById(id).exec();
  }
   
  async updateBooking(id: string, updateBookingDto: CreateBookingDto): Promise<Booking | null> {
    return this.bookingModel.findByIdAndUpdate(id, updateBookingDto, { new: true }).exec();
  }

  async deleteBooking(id: string): Promise<Booking | null> {
    return this.bookingModel.findByIdAndDelete(id).exec();
  }
}