import { IsBoolean, IsNumber, IsDate, IsNotEmpty, IsString, IsOptional } from "class-validator";

export class createQuizDto {

    @IsString()
    @IsNotEmpty()
    title: String;

    @IsDate()
    @IsNotEmpty()
    startdatetime: Date;

    @IsDate()
    @IsNotEmpty()
    enddatetime: Date;

    @IsNumber()
    @IsNotEmpty()
    totalquestion: Number;

    @IsDate()
    @IsNotEmpty()
    createdon: Date;


}








