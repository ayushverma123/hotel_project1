import mongoose from 'mongoose';  
import { ObjectId } from 'mongodb';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
  
export type BookingDocument = HydratedDocument<Booking>;

@Schema()
export class Booking {
  @Prop({ type: String, required: true })
  booking_date: string;

  @Prop({ type: String, required: true })
  checkout_date: string;

  @Prop({ type: String, required: true })
  room_alloted: string;

  @Prop({ type: String, required: true })
  room_type: string;

  @Prop({ type: Number, required: true })
  identity_type: number;
  
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Hotel', required: true })
  hotel_id: ObjectId;

  @Prop({ type: String, required: true })
  customer_email: string;

}

export const BookingSchema = SchemaFactory.createForClass(Booking);
