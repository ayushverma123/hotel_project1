import mongoose, { Schema, Document } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { ObjectId } from 'mongodb';

export interface Booking extends Document {
   
    
    booking_date: string,
    checkout_date: string,
    room_alloted: string,
    room_type: string,
    identity_type: number ,
    hotel: string;
    hote_id: ObjectId;
    customer_email: string;
    
}

export const BookingSchema: Schema = new Schema({
 

 cusId: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer',},
 booking_date:{ type: Date, required: true }, 
 checkout_date: { type: Date, required: true },
 room_alloted: { type: Number, required: true },
 room_type: { type: String, required: true },
 identity_type: { type: String, required: true },
 hote_id: { type: ObjectId, required: true},
 hotel: { type:String},
 customer_email: { type: String},
 
  
});


export const Booking = mongoose.model<Booking>('Booking', BookingSchema);