import { HotelSchema } from '../entities/hotel.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { HotelService } from './hotel.service';
import { HotelController } from './hotel.controller';


@Module({
  imports: [MongooseModule.forRoot("mongodb+srv://ayushv657:gkczp9LJXpkYnN7u@cluster0.stthbi5.mongodb.net/mydatabase?retryWrites=true&w=majority"),
  MongooseModule.forFeature([{ name: 'Hotel', schema: HotelSchema }]),
  ],
  controllers: [ HotelController],
  providers: [ HotelService],
  exports: [ HotelService ]
})
export class HotelModule {}
