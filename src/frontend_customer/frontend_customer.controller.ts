import { AuthService } from 'src/auth/auth.service';  
import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard';
import { Customer } from 'src/entities/customer.schema';
import { CustomerService } from 'src/customer/customer.service';
import { CreateCustomerDto } from 'src/customer/dto/createCustomer-dto';
import { Booking } from 'src/entities/booking.schema';
import { BookingService } from 'src/booking/booking.service';
import { CreateBookingDto } from 'src/booking/dto/createBooking-dto';
import { Controller, Get, Post, Put, Delete, Param, Body, Query, UseGuards, Request, UsePipes, ValidationPipe } from '@nestjs/common';  
import { Hotel } from '../entities/hotel.schema';
import { HotelService } from 'src/hotel/hotel.service';
import { GetQueryDto } from 'src/hotel/dto/query-dto';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { BookingInterfaceResponse } from 'src/booking/interface/BookingResponse-interface';
import { ApiTags } from '@nestjs/swagger';
import { CustomerInterfaceResponse } from 'src/customer/interface/CustomerResponse.interface';

@ApiTags('Frontend')
@Controller('frontend')
export class FrontendController {
    constructor(private readonly hotelService: HotelService,
        private readonly bookingService: BookingService,
        private readonly customerService: CustomerService,
        private readonly authService: AuthService) { }


    @UseGuards(LocalAuthGuard)
    @Post('login')
    async login(@Request() req) {
        return await this.authService.login(req.user);
    }

    @UseGuards(JwtGuard)
    @Get('getall')
    async getHotelsInFrontend(
        @Query() queryDto: GetQueryDto,
    ): Promise<Hotel[]> {
        if (queryDto.search || queryDto.limit || queryDto.fromDate || queryDto.toDate || queryDto.pageNumber || queryDto.pageSize) {
            return this.hotelService.getFilteredHotels(queryDto);
        } else {
            return this.hotelService.getAllHotels();
        }
    }

    @UsePipes(new ValidationPipe())
    @Post('createCustomer')
    async createCustomer(@Body() createCustomerDto: CreateCustomerDto): Promise<CustomerInterfaceResponse> {
        return this.customerService.create(createCustomerDto);
    }


    @UsePipes(new ValidationPipe())
    @UseGuards(JwtGuard)
    @Post('createBooking')
    async createBooking(@Body() createBookingDto: CreateBookingDto): Promise<BookingInterfaceResponse> {
        return this.bookingService.createBooking(createBookingDto);
    }

    @UseGuards(JwtGuard)
    @Get('getbyid/:id')
    async getBookingById(@Param('id') id: string): Promise<BookingInterfaceResponse | null> {
        return this.bookingService.getBookingById(id);
    }

    @UseGuards(JwtGuard)
    @Put('updatebyid/:id')
    async updateBooking(
        @Param('id') id: string,
        @Body() updateBookingDto: CreateBookingDto,
    ): Promise<BookingInterfaceResponse | null> {
        return this.bookingService.updateBooking(id, updateBookingDto);
    }

    @UseGuards(JwtGuard)
    @Delete('deletebyid/:id')
    async deleteBooking(@Param('id') id: string): Promise<BookingInterfaceResponse | null> {
        return this.bookingService.deleteBooking(id);
    }

    @Delete('cancel/:id')
    async cancelBooking(@Param('id') id: string): Promise<BookingInterfaceResponse | null> {
        return this.bookingService.cancelBooking(id);
    }
}



