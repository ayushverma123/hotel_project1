import mongoose, { Schema, Document } from 'mongoose';
import * as bcrypt from 'bcrypt';

export interface Hotel extends Document {
   
    
    hotel_name: string,
    country: string,
    state: string,
    city: string,
    pincode: number,
    lat_lon: number 
    address: string,
    room_single: number
    room_deluxe: number
    room_family: number
}

export const HotelSchema: Schema = new Schema({
 
  hotel_name: { type: String, required: true },
  country: { type: String, required: true },
  state: { type: String, required: true },
  city: { type: String, required: true },
  pincode: { type: Number, required: true },
  lat_lon: { type: Number, required: true},
  address: { type: String, required: true },
  room_single: {type: Number, required: true},
  room_deluxe: {type: Number, required: true},
  room_family: {type: Number, required: true},
});


export const Hotel = mongoose.model<Hotel>('User', HotelSchema);