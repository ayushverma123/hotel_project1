import mongoose, { Schema, Document } from 'mongoose';
import * as bcrypt from 'bcrypt';

export interface Hotel extends Document {


  hotel_name: string,
  country: string,
  state: string,
  city: string,
  pincode: number,
  lat_lon: {
    lat: string;
    long: string;
  },
  address: string,
  room_single: number
  room_deluxe: number
  room_family: number
  contact_person: string;
  contact_number: number;
  contact_email: string;
}

export const HotelSchema: Schema = new Schema({

  hotel_name: { type: String, required: true },
  country: { type: String, required: true },
  state: { type: String, required: true },
  city: { type: String, required: true },
  pincode: { type: Number, required: true },
  lat_lon: {
    lat: { type: String, required: true },
    long: { type: String, required: true },
  },
  address: { type: String, required: true },
  room_single: { type: Number, required: true },
  room_deluxe: { type: Number, required: true },
  room_family: { type: Number, required: true },
  contact_person: { type: String, required: true },
  contact_number: { type: Number, required: true },
  contact_email: { type: String, required: true },
});


export const Hotel = mongoose.model<Hotel>('Hotel', HotelSchema);