import { Controller, Get, Post, Put, Delete, Param, Body , Query, UseGuards} from '@nestjs/common';
import { Hotel } from '../entities/hotel.schema';
import { HotelService } from './hotel.service';
import { CreateHotelDto } from './dto/createHotel-dto';
import { GetQueryDto } from './dto/query-dto';
import { HotelInterfaceResponse} from './interface/HotelResponse.interface';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';

@Controller('hotels')
export class HotelController {
  constructor(private readonly hotelService: HotelService) {}

  @Get('getall')
  async getHotels(
    @Query() queryDto: GetQueryDto,
  ): Promise<Hotel[]> {
    if (queryDto.search || queryDto.limit || queryDto.fromDate || queryDto.toDate || queryDto.pageNumber || queryDto.pageSize) {
      return this.hotelService.getFilteredHotels(queryDto);
    } else {
      return this.hotelService.getAllHotels();
    }
  }

  @Get('getbyid/:id')
  async getHotelById(@Param('id') id: string): Promise<HotelInterfaceResponse | null> {
    return this.hotelService.getHotelById(id);
  }


  @Post('create')
  async createHotel(@Body() createHotelDto: CreateHotelDto): Promise<Hotel> {
    return this.hotelService.createHotel(createHotelDto);
  }

  @Put('updatebyid/:id')
  async updateHotel(
    @Param('id') id: string,
    @Body() updateHotelDto: CreateHotelDto,
  ): Promise<HotelInterfaceResponse | null> {
    return this.hotelService.updateHotel(id, updateHotelDto);
  }

  @Delete('deletebyid/:id')
  async deleteHotel(@Param('id') id: string): Promise<HotelInterfaceResponse| null> {
    return this.hotelService.deleteHotel(id);
  }
}