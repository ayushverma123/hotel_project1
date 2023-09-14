import mongoose, { Schema, Document } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { ObjectId } from 'mongodb';

export interface Answer extends Document {

    quizid: ObjectId;
    quizquestionid: ObjectId;
    optionChoice: string;
    quizparticipentid: ObjectId;
    
}   

export const AnswerSchema: Schema = new Schema({

    quizid: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', },
    quizquestionid: { type: mongoose.Schema.Types.ObjectId, ref: 'QQuestion', },
    optionChoice: { type: String, required: true},
    quizparticipentid: { type: mongoose.Schema.Types.ObjectId, ref: 'User', },
});


export const QQuestion = mongoose.model<Answer>('Answer', AnswerSchema);