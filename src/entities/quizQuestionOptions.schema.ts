
import mongoose, { Schema, Document } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { ObjectId } from 'mongodb';

export interface Option extends Document {

    isCorrect: boolean,
    questionOptionText: string
    quizquestionid: ObjectId,

}

export const OptionSchema: Schema = new Schema({

    isCorrect: { type: Boolean, required: true },
    quizquestionid: { type: mongoose.Schema.Types.ObjectId, ref: 'QQuestion', },
    questionOptionText: { type: String, required: true },

});


export const Option = mongoose.model<Option>('Option', OptionSchema);