import mongoose from 'mongoose';
import { Schema, Document, model } from 'mongoose';

export interface Otp extends Document {
  email: string;
  otp: string;
}

export const OtpSchema: Schema = new Schema({
  email: { type: String, required: true },
  otp: { type: String, required: true },
});


export const Otp = mongoose.model<Otp>('Otp', OtpSchema);