import { HotelSchema } from '../entities/hotel.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { HotelService } from './hotel.service';
import { HotelController } from './hotel.controller';


@Module({
  imports: [MongooseModule.forFeature([{ name: 'Hotel', schema: HotelSchema }]),],
  controllers: [HotelController],
  providers: [HotelService],
  exports: [HotelService]
})
export class HotelModule { }
