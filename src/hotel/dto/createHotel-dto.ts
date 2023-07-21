import {IsEmail,IsObject, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateHotelDto {

    @IsString()
    @IsNotEmpty()
    hotel_name: string;

    @IsString()
    @IsNotEmpty()
    country: string;

    @IsString()
    @IsNotEmpty()
    state: string;

    @IsString()
    @IsNotEmpty()
    city: string;

    @IsNumber()
    @IsNotEmpty()
    pincode: number;

    @IsString()
    @IsNotEmpty()
    address: string;

    @IsObject()
    @IsNotEmpty()
    lat_lon: {
        lat: string;
        long: string;
    };

    @IsNumber()
    room_family: number;

    @IsNumber()
    room_single: number;

    @IsNumber()
    room_deluxe: number;

    @IsString()
    @IsNotEmpty()
    contact_person: string

    @IsNumber()
    @IsNotEmpty()
    contact_number: number;

    @IsEmail()
    @IsNotEmpty()
    contact_email: string;


}








