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
import { HttpExceptionFilter } from './exceptions/httpFilter-exception';

@Injectable()
export class HotelService {
    constructor(@InjectModel('Hotel') private readonly hotelModel: Model<Hotel>) { }

    async createHotel(createHotelDto: CreateHotelDto): Promise<Hotel> {
        const createdHotel = new this.hotelModel(createHotelDto);
        
        if (!createdHotel) {
            throw new InternalServerErrorException('Unable to create hotel');
        }

        return createdHotel.save();
    }


    async getAllHotels(): Promise<Hotel[]> {
        return this.hotelModel.find().exec();
    }

    async getFilteredHotels(queryDto: GetQueryDto): Promise<Hotel[]> {
        const { search, limit, pageNumber, pageSize, fromDate, toDate } = queryDto;
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

        return query.exec();

    }

    async getHotelById(id: string): Promise<HotelInterfaceResponse | null> {
        const hotelbyId = await this.hotelModel.findById(id).exec();
        
        if (!hotelbyId) {

                throw HttpExceptionFilter;
            // throw  new InternalServerErrorException("hotel could not be found");
            //throw new HotelNotFoundException("Hotel could not be found");
        }

        return {
            code: 200,
            message: 'Hotel found successfully',
            status: 'success',
            data: hotelbyId,
        };
    }
     

    async updateHotel(id: string, updateHotelDto: CreateHotelDto): Promise<HotelInterfaceResponse | null> {
        //return this.hotelModel.findByIdAndUpdate(id, updateHotelDto, { new: true }).exec();
        const updatedHotel = await this.hotelModel.findByIdAndUpdate(id, updateHotelDto, { new: true }).exec();

        if (!updatedHotel) {
            throw new InternalServerErrorException('Unable to update hotel');
        }

        return {
            code: 200,
            message: 'Hotel updated successfully',
            status: 'success',
            data: updatedHotel,
        };
    }
            

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
}
