import { Customer } from './customer.schema';
import  mongoose from 'mongoose';
import { Schema, Document, model } from 'mongoose';

export interface Access extends Document {


  access_customer: Customer;
 // accessToken: string;
 
  
}

export const AccessSchema: Schema = new Schema({

  access_customer: { type: Schema.Types.Mixed, required: true },
  //accessToken: { type: String, required: true },
});


export const Access = mongoose.model<Access>('Access', AccessSchema);