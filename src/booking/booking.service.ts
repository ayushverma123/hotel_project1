import { InternalServerErrorException , NotFoundException} from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Booking } from '../entities/booking.schema';
import { CreateBookingDto } from './dto/createBooking-dto';
import { Customer } from 'src/entities/customer.schema';
import { GetQueryDto } from './dto/query-dto';
import { CreateCustomerDto } from 'src/customer/dto/createCustomer-dto';
import { BookingInterfaceResponse } from './interface/BookingResponse-interface';

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
    const existingBooking = await this.bookingModel.findOne({
      cusId: createBookingDto.cusId
      // Add additional properties if necessary for uniqueness check
  });
  
    if (existingBooking) {
      // Customer with the same details already exists, throw an error
      throw new NotFoundException('Booking already exist');
    }
    else {
    const createdBooking = new this.bookingModel(newBlogData);
    return createdBooking.save();
  }

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

  /*
  async getBookingById(id: string): Promise<Booking | null> {

    const checkBooking= await this.bookingModel.findById(id);
    if(!checkBooking)
    {
      throw new NotFoundException('no booking');
    }
    else{
    return this.bookingModel.findById(id).exec();
  }
}
*/

async getBookingById(id: string): Promise<BookingInterfaceResponse> {
  try {
    const FoundBooking = await this.bookingModel.findByIdAndDelete(id).exec();

    if (!FoundBooking) {
      throw new NotFoundException('Unable to find booking');
    }
      else{

          return {
              code: 200,
              message: 'Booking found successfully',
              status: 'success',
              data: FoundBooking,
          };
      }
    }
   catch (error) {
    // Handle the specific CastError here
    if (error) {
      throw new NotFoundException('Invalid hotel ID');
    }

    // Handle other potential errors or rethrow them
    throw error;
  }
}


async updateBooking(id: string, updateBookingDto: CreateBookingDto): Promise<BookingInterfaceResponse> {
  try {
      const updatedBooking = await this.bookingModel.findByIdAndUpdate(id, updateBookingDto, { new: true }).exec();

    if (!updatedBooking) {
      throw new NotFoundException('Unable to update booking');
    }
      else{

          return {
              code: 200,
              message: 'Booking updated successfully',
              status: 'success',
              data: updatedBooking,
          };
      }
    }
   catch (error) {
    // Handle the specific CastError here
    if (error) {
      throw new NotFoundException('Invalid booking ID');
    }

    // Handle other potential errors or rethrow them
    throw error;
  }
}
   /*
  async updateBooking(id: string, updateBookingDto: CreateBookingDto): Promise<Booking | null> {
    return this.bookingModel.findByIdAndUpdate(id, updateBookingDto, { new: true }).exec();
  }
  */

  async deleteBooking(id: string): Promise<BookingInterfaceResponse | null> {
    const deletedBooking = await this.bookingModel.findByIdAndDelete(id);

        if (!deletedBooking) {
            throw new InternalServerErrorException('Unable to delete boooking');
        }

        return {
            code: 200,
            message: 'Booking deleted successfully',
            status: 'success',
            data: deletedBooking,
        };
    }


async deleteBookingnew(id: string): Promise<BookingInterfaceResponse> {
  try {
    const deletedBooking = await this.bookingModel.findByIdAndDelete(id).exec();

    if (!deletedBooking) {
      throw new NotFoundException('Unable to delete booking');
    }
      else{

          return {
              code: 200,
              message: 'Booking deleted successfully',
              status: 'success',
              data: deletedBooking,
          };
      }
    }
   catch (error) {
    // Handle the specific CastError here
    if (error) {
      throw new NotFoundException('Invalid booking ID');
    }

    // Handle other potential errors or rethrow them
    throw error;
  }
}



    async cancelBooking(id: string): Promise<BookingInterfaceResponse | null> {
      const deletedBooking = await this.bookingModel.findByIdAndDelete(id);
  
          if (!deletedBooking) {
              throw new InternalServerErrorException('Boooking already canceled');
          }
  
          return {
              code: 200,
              message: 'Booking canceled successfully',
              status: 'success',
              data: deletedBooking,
          };
      }
}