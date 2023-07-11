import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common';
import { CreateBookingDto } from './dto/createBooking-dto';
import { BookingService } from './booking.service';
import { GetQueryDto } from './dto/query-dto';
import { Booking } from '../entities/booking.schema';

@Controller('bookings')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Get('getall')
  async getBookings(
    @Query() queryDto: GetQueryDto,
  ): Promise<Booking[]> {
    if (queryDto.search || queryDto.limit || queryDto.fromDate || queryDto.toDate || queryDto.pageNumber || queryDto.pageSize) {
      return this.bookingService.getFilteredBookings(queryDto);
    } else {
      return this.bookingService.getAllBooking();
    }
  }



  @Get('getbyid/:id')
  async getBookingById(@Param('id') id: string): Promise<Booking | null> {
    return this.bookingService.getBookingById(id);
  }

  @Post('create')
  async createBooking(@Body() createBookingDto: CreateBookingDto): Promise<Booking> {
    return this.bookingService.createBooking(createBookingDto);
  }

  @Put('updatebyid/:id')
  async updateBooking(
    @Param('id') id: string,
    @Body() updateBookingDto: CreateBookingDto,
  ): Promise<Booking | null> {
    return this.bookingService.updateBooking(id, updateBookingDto);
  }

  @Delete('deletebyid/:id')
  async deleteBooking(@Param('id') id: string): Promise<Booking | null> {
    return this.bookingService.deleteBooking(id);
  }
}
