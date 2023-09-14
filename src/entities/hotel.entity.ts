import mongoose from 'mongoose';  
import { ObjectId } from 'mongodb';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
  
export type HotelDocument = HydratedDocument<Hotel>;

@Schema()
export class Hotel {
  @Prop({ type: String, required: true })
  hotel_name: string;

  @Prop({ type: String, required: true })
  country: string;

  @Prop({ type: String, required: true })
  state: string;

  @Prop({ type: String, required: true })
  city: string;

  @Prop({ type: String, required: true })
  address: string;

  @Prop({ type: Number, required: true })
  pincode: number;

  @Prop({type: Number, required: true})
  room_single: number;

  @Prop({type: Number, required: true})
  room_family: number

  @Prop({type: Number, required: true})
  room_deluxe: number;

}

export const HotelSchema = SchemaFactory.createForClass(Hotel);
