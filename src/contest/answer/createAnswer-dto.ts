import { IsMongoId, IsString } from "class-validator";
import { ObjectId } from "mongodb";

export class CreateAnswerDto {

    @IsMongoId()
    quizparticipentid: ObjectId;

    @IsMongoId()
    quizid: ObjectId;

    @IsMongoId()
    quizquestionid: ObjectId;

    @IsString() // Assuming the participant's selected option is a string
    optionChoice: string;

}
