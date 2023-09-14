import { ObjectId } from "mongodb";
import { IsMongoId, IsDate, IsNumber, IsNotEmpty, } from "class-validator";


export class CreateuserDto {
    
    @IsMongoId()
    quizid: ObjectId;

    @IsMongoId()
    userid: ObjectId;
 
    @IsDate()
    @IsNotEmpty()
    startdatetime: Date;

}