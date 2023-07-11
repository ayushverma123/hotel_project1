import { IsNumber, IsDate, IsString, IsNotEmpty, IsMongoId } from 'class-validator';
import { ObjectId } from 'mongodb';

export class CreateBookingDto {

    @IsMongoId()
    @IsNotEmpty()
    cusId: ObjectId;

    @IsString()
    @IsNotEmpty()
    booking_date: Date;

    @IsString()
    @IsNotEmpty()
    checkout_date: Date;

    @IsNumber()
    @IsNotEmpty()
    room_alloted: number;

    @IsString()
    @IsNotEmpty()
    room_type: string;

    @IsString()
    @IsNotEmpty()
    identity_type: string;

    @IsMongoId()
    hote_id: ObjectId;

    








}