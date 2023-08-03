import { IsDate, IsString, IsNumber, IsOptional, IsIn } from "class-validator";

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

    @IsNumber()
    @IsOptional()
    hotel_id: number;

    @IsString()
    @IsOptional()
    hotel_name: string;

    @IsString()
    @IsOptional()
    country: string;

    @IsString()
    @IsOptional()
    state: string;

    @IsString()
    @IsOptional()
    city: string;

    @IsNumber()
    @IsOptional()
    pincode: number;

    @IsString()
    @IsOptional()
    address: string;

    @IsNumber()
    @IsOptional()
    lat_lon: number;

    @IsNumber()
    @IsOptional()
    room_family: number;

    @IsNumber()
    @IsOptional()
    room_single: number;

    @IsNumber()
    @IsOptional()
    room_deluxe: number;

    @IsString()
    @IsOptional()
    @IsIn(['hotel_name', 'country', 'state', 'city', 'address'])
    sortField?: string;

    @IsString()
    @IsOptional()
    @IsIn(['asc', 'desc'])
    sortOrder?: string;


}