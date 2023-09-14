import mongoose, { Schema, Document } from 'mongoose';        
import * as bcrypt from 'bcrypt';
import { ObjectId } from 'mongodb';

export interface User extends Document {

    userid: ObjectId;
    quizid: ObjectId;
    startdatetime: Date;
    enddatetime: Date;
}

export const UserSchema:
 Schema = new Schema({

    userid: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer'},
    quizid: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', },
    startdatetime: { type: Date, required: true},
    enddatetime:{ type: Date}
   

});

export const User = mongoose.model<User>('User', UserSchema);
