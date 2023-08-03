import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsDate, IsString, IsNotEmpty, IsMongoId } from 'class-validator';
import { ObjectId } from 'mongodb';

export class CreateBookingDto {

    @ApiProperty()
    @IsMongoId()
    @IsNotEmpty()
    cusId: ObjectId;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    booking_date: Date;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    checkout_date: Date;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    room_alloted: number;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    room_type: string;


    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    identity_type: string;

    @ApiProperty()
    @IsMongoId()
    hote_id: ObjectId;


}