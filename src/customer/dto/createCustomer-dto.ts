import {IsMobilePhone,IsEmail, IsNumber, IsDate, IsString, IsNotEmpty } from 'class-validator';

export class CreateCustomerDto {
        
    @IsString()
    @IsNotEmpty()
    firstName: string;

    @IsString()
    @IsNotEmpty()
    lastName: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;

    @IsMobilePhone()
    @IsNotEmpty()
    mobileNo: number;

    @IsString()
    @IsNotEmpty()
    date_of_birth: Date;

    @IsString()
    @IsNotEmpty()
    gender: string;

    




}