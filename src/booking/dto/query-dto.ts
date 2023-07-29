import { IsIn, IsDate, IsString, IsNumber, IsOptional } from "class-validator";

export class GetQueryDto {

    @IsString()
    @IsOptional()
    search?: string;

    @IsNumber()
    @IsOptional()
    limit?: number;

    @IsNumber()
    @IsOptional()
    pageNumber: number;

    @IsNumber()
    @IsOptional()
    pageSize: number;

    @IsDate()
    @IsOptional()
    fromDate: Date;

    @IsDate()
    @IsOptional()
    toDate: Date;

    @IsString()
    @IsOptional()
    HotelName: string;

    @IsString()
    @IsOptional()
    booking_date: Date;

    @IsString()
    @IsOptional()
    checkout_date: Date;

    @IsNumber()
    @IsOptional()
    room_alloted: number;

    @IsDate()
    @IsOptional()
    room_type: string;

    @IsString()
    @IsOptional()
    identity_type: string;

    @IsString()
    @IsOptional()
    cus_email: string;

    @IsString()
    @IsOptional()
    @IsIn(['room_type', 'identity_type'])
    sortField?: string;

    @IsString()
    @IsOptional()
    @IsIn(['asc', 'desc'])
    sortOrder?: string;


}