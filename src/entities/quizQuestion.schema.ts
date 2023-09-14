import mongoose, { Schema, Document } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { ObjectId } from 'mongodb';

export interface QQuestion extends Document {

    type: string,
    questiontext: string,
    quizid: ObjectId;
    createdon: Date;
    options: {
        choice: string;
      }[];
    correctAnswer: string;
    
}

export const QQuestionSchema: Schema = new Schema({

    type: { type: String, required: true },
    questiontext: { type: String, required: true },
    quizid: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', },
    createdon: { type: Date, required: true },
    options: [
        {
          choice: { type: String, required: true },

        },],

    correctAnswer: {type: String}    

});


export const QQuestion = mongoose.model<QQuestion>('QQuestion', QQuestionSchema);