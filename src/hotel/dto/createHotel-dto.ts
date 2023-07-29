import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsObject, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateHotelDto {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    hotel_name: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    country: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    state: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    city: string;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    pincode: number;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    address: string;

    @ApiProperty()
    @IsObject()
    @IsNotEmpty()
    lat_lon: {
        lat: string;
        long: string;
    };

    @ApiProperty()
    @IsNumber()
    room_family: number;

    @ApiProperty()
    @IsNumber()
    room_single: number;

    @ApiProperty()
    @IsNumber()
    room_deluxe: number;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    contact_person: string

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    contact_number: number;

    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    contact_email: string;


}








