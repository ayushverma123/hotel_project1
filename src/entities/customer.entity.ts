import mongoose from 'mongoose';
import { ObjectId } from 'mongodb';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CustomerDocument = HydratedDocument<Customer>;

@Schema()
export class Customer {
  @Prop({ type: String, required: true })
  firstName: string;

  @Prop({ type: String, required: true })
  lastName: string;

  @Prop({ type: String, required: true })
  email: string;

  @Prop({ type: Number, required: true })
  mobileNo: number;

  @Prop({ type: Date, required: true })
  date_of_birth: Date;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({type: String, required: true})
  gender: string;


}

export const CustomerSchema = SchemaFactory.createForClass(Customer);