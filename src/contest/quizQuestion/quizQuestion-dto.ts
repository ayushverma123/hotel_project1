import { ObjectId } from "mongodb";
import { ValidateNested,IsBoolean, IsNumber, IsDate, IsNotEmpty, IsString, IsMongoId , IsOptional} from "class-validator";

export class createQuizQuestionDto {

    @IsString()
    @IsNotEmpty()
    type: string;

    @IsString()
    @IsNotEmpty()
    questiontext: string;

    @IsDate()
    @IsNotEmpty()
    createdon: Date;

    @IsMongoId()
    @IsNotEmpty()
    quizid: ObjectId;
    
    @IsOptional()
    @ValidateNested({ each: true })
    options: {
        choice: string;
    }[];


}








