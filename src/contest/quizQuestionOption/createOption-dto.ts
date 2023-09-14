import { ObjectId } from "mongodb";
import { IsBoolean, IsNumber, IsDate, IsNotEmpty, IsString, IsOptional, IsMongoId} from "class-validator";

export class createOptionDto {

    
    @IsString() // Validate each element as a string
    @IsOptional()
    questionOptionText: string;

    @IsMongoId()
    @IsNotEmpty()
    quizquestionid: ObjectId;

    @IsBoolean()
    isCorrect: Boolean;

}


   








