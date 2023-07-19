import { UsePipes } from '@nestjs/common/decorators';
import { ValidationPipe } from '@nestjs/common/pipes';
import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common';
import { CreateBookingDto } from './dto/createBooking-dto';
import { BookingService } from './booking.service';
import { GetQueryDto } from './dto/query-dto';
import { Booking } from '../entities/booking.schema';
import { BookingInterfaceResponse } from './interface/BookingResponse-interface';

@Controller('bookings')
export class BookingController {
  constructor(private readonly bookingService: BookingService) {}

  @Get('getall')
  async getBookings(
    @Query() queryDto: GetQueryDto,
  ): Promise<Booking[]> {
    if (queryDto.search || queryDto.limit || queryDto.fromDate || queryDto.toDate || queryDto.pageNumber || queryDto.pageSize || queryDto.sortField || queryDto.sortOrder) {
      return this.bookingService.getFilteredBookings(queryDto);
    } else {
      return this.bookingService.getAllBooking();
    }
  }


  @Get('getbyid/:id')
  async getBookingById(@Param('id') id: string): Promise<BookingInterfaceResponse | null> {
    return this.bookingService.getBookingById(id);
  }

  @UsePipes(new ValidationPipe())
  @Post('create')
  async createBooking(@Body() createBookingDto: CreateBookingDto): Promise<Booking> {
    return this.bookingService.createBooking(createBookingDto);
  }

  @Put('updatebyid/:id')
  async updateBooking(
    @Param('id') id: string,
    @Body() updateBookingDto: CreateBookingDto,
  ): Promise<BookingInterfaceResponse | null> {
    return this.bookingService.updateBooking(id, updateBookingDto);
  }

  @Delete('deletebyid/:id')
  async deleteBooking(@Param('id') id: string): Promise<BookingInterfaceResponse | null> {
    return this.bookingService.deleteBookingnew(id);
  }

  @Delete('cancel/:id')
    async cancelBooking(@Param('id') id: string): Promise<BookingInterfaceResponse | null> {
        return this.bookingService.deleteBooking(id);
    }
}
