import { Role } from 'src/entities/customer.schema';
import { ApiProperty } from '@nestjs/swagger';
import { IsMobilePhone, IsEmail, IsNumber, IsDate, IsString, IsNotEmpty } from 'class-validator';

export class CreateCustomerDto {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    firstName: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    lastName: string;

    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    password: string;

    @ApiProperty()
    @IsMobilePhone()
    @IsNotEmpty()
    mobileNo: number;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    date_of_birth: Date;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    gender: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    role: Role; // Include the role property for testing
  }

    


