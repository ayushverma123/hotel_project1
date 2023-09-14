import mongoose, { Schema, Document } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { ObjectId } from 'mongodb';

export interface Quiz extends Document {

    title: string,
    startdatetime: Date,
    enddatetime: Date,
    totalquestion: number,
    createdon: Date;
}

export const QuizSchema: Schema = new Schema({

    title: {type: String, required: true},
    startdatetime: {type: Date, required:true},
    enddatetime: {type: Date, required: true},
    totalquestion: { type: Number, required:true},
    createdon: {type: Date, required: true}
});


export const Quiz = mongoose.model<Quiz>('Quiz', QuizSchema);