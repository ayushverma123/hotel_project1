import {IsNotEmpty, IsNumber, IsString } from "class-validator";

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

    @IsNumber()
    lat_lon: number;

    @IsNumber()
    room_family: number;

    @IsNumber()
    room_single: number;

    @IsNumber()
    room_deluxe: number;


}








