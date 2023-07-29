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

    @IsString()
    @IsOptional()
    firstName: string;

    @IsString()
    @IsOptional()
    lastName: string;

    @IsString()
    @IsOptional()
    email: string;

    @IsString()
    @IsOptional()
    mobileNo: string;

    @IsString()
    @IsOptional()
    gender: string;

    @IsDate()
    @IsOptional()
    date_of_birth: Date;

    @IsString()
    @IsOptional()
    @IsIn(['email', 'gender', 'firstName', 'lastName'])
    sortField?: string;

    @IsString()
    @IsOptional()
    @IsIn(['asc', 'desc'])
    sortOrder?: string;


}

