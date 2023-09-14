import { UseGuards } from '@nestjs/common';
import { ApiOkResponse, ApiNotFoundResponse } from '@nestjs/swagger';
import { ApiCreatedResponse, ApiForbiddenResponse } from '@nestjs/swagger';
import { UsePipes } from '@nestjs/common/decorators';
import { ValidationPipe } from '@nestjs/common/pipes';
import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common';
import { CreateBookingDto } from './dto/createBooking-dto';
import { BookingService } from './booking.service';
import { GetQueryDto } from './dto/query-dto';
import { Booking } from '../entities/booking.schema';
import { BookingInterfaceResponse } from './interface/BookingResponse-interface';
import { ApiTags } from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';

@UseGuards(JwtGuard)
@ApiTags('Bookings')
@Controller('bookings')
export class BookingController {
  constructor(private readonly bookingService: BookingService) { }

  @Get('getall')
  async getBookings(@Query() queryDto: GetQueryDto): Promise<any> {
    return this.bookingService.getFilteredBookings(queryDto);

  }
  
  @ApiOkResponse({ description: 'Successfully retrieved Booking.' })
  @ApiNotFoundResponse({ description: 'Booking not found.' })
  @Get('getbyid/:id')
  async getBookingById(@Param('id') id: string): Promise<BookingInterfaceResponse | null> {
    return this.bookingService.getBookingById(id);
  }

  @ApiCreatedResponse({ description: 'The record has been successfully created.' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @UsePipes(new ValidationPipe())
  @Post('create')
  async createBooking(@Body() createBookingDto: CreateBookingDto): Promise<BookingInterfaceResponse | null > {
    return this.bookingService.createBooking(createBookingDto);
  }

  @ApiOkResponse({ description: 'Successfully retrieved Booking.' })
  @ApiNotFoundResponse({ description: 'Booking not found.' })
  @UsePipes(new ValidationPipe())
  @Put('updatebyid/:id')
  async updateBooking(
    @Param('id') id: string,
    @Body() updateBookingDto: CreateBookingDto,
  ): Promise<BookingInterfaceResponse | null> {
    return this.bookingService.updateBooking(id, updateBookingDto);
  }

  @ApiOkResponse({ description: 'Successfully retrieved booking.' })
  @ApiNotFoundResponse({ description: 'Booking not found.' })
  @Delete('deletebyid/:id')
  async deleteBooking(@Param('id') id: string): Promise<BookingInterfaceResponse | null> {
    return this.bookingService.deleteBookingnew(id);
  }

  @Delete('cancel/:id')
  async cancelBooking(@Param('id') id: string): Promise<BookingInterfaceResponse | null> {
    return this.bookingService.deleteBooking(id);
  }
}
