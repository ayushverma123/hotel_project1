import { CastError, SortOrder } from 'mongoose';
import { NotFoundException } from '@nestjs/common';
import { InternalServerErrorException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Hotel } from '../entities/hotel.schema';
import { CreateHotelDto } from './dto/createHotel-dto';
import  { HotelInterfaceResponse } from './interface/HotelResponse.interface';
import { GetQueryDto } from './dto/query-dto';
import HotelNotFoundException from './exceptions/HotelNotFoundException';


@Injectable()
export class HotelService {
    constructor(@InjectModel('Hotel') private readonly hotelModel: Model<Hotel>) { }

   /* async createHotel(createHotelDto: CreateHotelDto): Promise<Hotel> {
        const createdHotel = new this.hotelModel(createHotelDto);
        
        if (!createdHotel) {
            throw new InternalServerErrorException('Unable to create hotel');
        }

        return createdHotel.save();
    } */

    async createHotel(createHotelDto: CreateHotelDto): Promise<{ message: string, hotel: Hotel | null }> {
        // Check if a customer with the same details already exists
        const existingHotel = await this.hotelModel.findOne({
          address: createHotelDto.address,
          // Add additional properties if necessary for uniqueness check
        });
      
        if (existingHotel) {
          // Customer with the same details already exists, throw an error
          throw new NotFoundException('hotel already exist')

        }
      
        // No existing hotel found, create a new one
        const createdHotel = await this.hotelModel.create(createHotelDto);
        await createdHotel.save();
      
        const successMessage = 'Hotel created successfully';
        return { message: successMessage, hotel: createdHotel };
      }

    async getAllHotels(): Promise<any> {
        return this.hotelModel.find().exec();
    }

    async getFilteredHotels(queryDto: GetQueryDto): Promise<any> {
      const { search, limit, pageNumber, pageSize, fromDate, toDate, sortField, sortOrder} = queryDto;
      const query = this.hotelModel.find();
  
      if (search) {
          query.or([
              { hotel_name: { $regex: search, $options: 'i' } },
              { country: { $regex: search, $options: 'i' } },
              { state: { $regex: search, $options: 'i' } },
              { city: { $regex: search, $options: 'i' } },
              { address: { $regex: search, $options: 'i' } },
          ]);
      }
  
      if (pageNumber && pageSize) {
          const skip = (pageNumber - 1) * pageSize;
          query.skip(skip).limit(pageSize);
      }
  
      if (sortField && sortOrder) {
          const sortOptions: [string, SortOrder][] = [[sortField, sortOrder as SortOrder]];
          query.sort(sortOptions);
      }
  
      const data = await query.exec();
      const totalRecords = await this.getTotalHotelCount();
  
      return { data, totalRecords };
  }
  
  async getTotalHotelCount(): Promise<number> {
      return this.hotelModel.countDocuments({});
  }
    

    /*
    async getHotelById(id: string): Promise<HotelInterfaceResponse | null> {
        const hotelbyId = await this.hotelModel.findById(id).exec();
        
        if (!hotelbyId) {

            
            // throw  new InternalServerErrorException("hotel could not be found");
            throw new HotelNotFoundException("Hotel could not be found");
        }
    

        return {
            code: 200,
            message: 'Hotel found successfully',
            status: 'success',
            data: hotelbyId,
        };
    }*/



    async getHotelById(id: string): Promise<HotelInterfaceResponse> {
        try {
          const Hotel = await this.hotelModel.findById(id).exec();
      
          if (!Hotel) {
            throw new NotFoundException('Unable to find hotel');
          }
            else{

                return {
                    code: 200,
                    message: 'Hotel found successfully',
                    status: 'success',
                    data: Hotel,
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


      async updateHotelnew(id: string, updateHotelDto: CreateHotelDto): Promise<HotelInterfaceResponse> {
        try {
            const updatedHotel = await this.hotelModel.findByIdAndUpdate(id, updateHotelDto, { new: true }).exec();
      
          if (!updatedHotel) {
            throw new NotFoundException('Unable to update hotel');
          }
            else{

                return {
                    code: 200,
                    message: 'Hotel updated successfully',
                    status: 'success',
                    data: updatedHotel,
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
/*
    async updateHotel(id: string, updateHotelDto: CreateHotelDto): Promise<HotelInterfaceResponse | null> {
        //return this.hotelModel.findByIdAndUpdate(id, updateHotelDto, { new: true }).exec();
        const updatedHotel = await this.hotelModel.findByIdAndUpdate(id, updateHotelDto, { new: true }).exec();

        if (!updatedHotel) {
            throw new NotFoundException('Unable to update hotel');
        }

        return {
            code: 200,
            message: 'Hotel updated successfully',
            status: 'success',
            data: updatedHotel,
        };
    }
*/  
/*
    async deleteHotel(id: string): Promise<HotelInterfaceResponse| null> {
        //  return this.hotelModel.findByIdAndDelete(id).exec();
        const deletedHotel = await this.hotelModel.findByIdAndDelete(id);

        if (!deletedHotel) {
            throw new InternalServerErrorException('Unable to delete hotel');
        }

        return {
            code: 200,
            message: 'Hotel deleted successfully',
            status: 'success',
            data: deletedHotel,
        };
    }

    */
    async deleteHotelnew(id: string): Promise<HotelInterfaceResponse> {
        try {
          const deletedHotel = await this.hotelModel.findByIdAndDelete(id).exec();
      
          if (!deletedHotel) {
            throw new NotFoundException('Unable to delete hotel');
          }
            else{

                return {
                    code: 200,
                    message: 'Hotel deleted successfully',
                    status: 'success',
                    data: deletedHotel,
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
      
      
      
      
      
      
      
}
