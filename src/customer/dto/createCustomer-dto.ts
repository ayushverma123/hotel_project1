import { IsNumber, IsDate, IsString, IsNotEmpty } from 'class-validator';

export class CreateCustomerDto {

    @IsString()
    name: string;
    
    @IsString()
    @IsNotEmpty()
    firstName: string;

    @IsString()
    @IsNotEmpty()
    lastName: string;

    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsNumber()
    @IsNotEmpty()
    mobileNo: number;

    @IsString()
    @IsNotEmpty()
    date_of_birth: Date;

    @IsString()
    @IsNotEmpty()
    gender: string;

    @IsString()
    @IsNotEmpty()
    HOTEL_NAME: string;

    




}