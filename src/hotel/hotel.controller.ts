import { Roles } from 'src/auth/guards/roles.decorator';   
import { RoleGuard } from 'src/auth/guards/role.guard';
import { Role } from 'src/entities/customer.schema';
import { ApiOkResponse, ApiNotFoundResponse } from '@nestjs/swagger';
import { ApiCreatedResponse, ApiForbiddenResponse } from '@nestjs/swagger';
import { HttpExceptionFilter } from './exceptions/httpFilter-exception';
import { UseFilters } from '@nestjs/common/decorators';
import { UsePipes } from '@nestjs/common/decorators';
import { ValidationPipe } from '@nestjs/common/pipes';
import { Controller, Get, Post, Put, Delete, Param, Body, Query, UseGuards } from '@nestjs/common';
import { Hotel } from '../entities/hotel.schema';
import { HotelService } from './hotel.service';
import { CreateHotelDto } from './dto/createHotel-dto';
import { GetQueryDto } from './dto/query-dto';
import { HotelInterfaceResponse } from './interface/HotelResponse.interface';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';


@ApiTags('Hotels')
@Controller('hotels')
export class HotelController {
  constructor(private readonly hotelService: HotelService) { }


  @Roles(Role.Admin)
  @UseGuards(JwtGuard, RoleGuard)
  @Get('getall')
  async getHotels(@Query() queryDto: GetQueryDto): Promise<any> {
    return this.hotelService.getFilteredHotels(queryDto);
  }

  @Roles(Role.Admin)
  @UseGuards(JwtGuard, RoleGuard)
  @ApiOkResponse({ description: 'Successfully retrieved hotel.' })
  @ApiNotFoundResponse({ description: 'Hotel not found.' })
  @Get('getbyid/:id')
  async getHotelById(@Param('id') id: string): Promise<HotelInterfaceResponse | null> {
    return this.hotelService.getHotelById(id);
  }


  @Roles(Role.Admin)
  @UseGuards(JwtGuard, RoleGuard)
  @ApiCreatedResponse({ description: 'The record has been successfully created.' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @UsePipes(new ValidationPipe())
  @Post('create')
  async createHotel(@Body() createHotelDto: CreateHotelDto): Promise<HotelInterfaceResponse | null> {
    return this.hotelService.createHotel(createHotelDto);
  }



  @Roles(Role.Admin)
  @UseGuards(JwtGuard, RoleGuard)
  @ApiOkResponse({ description: 'Successfully retrieved hotel.' })
  @ApiNotFoundResponse({ description: 'Hotel not found.' })
  @UsePipes(new ValidationPipe())
  @UseFilters(HttpExceptionFilter)
  @Put('updatebyid/:id')
  async updateHotel(
    @Param('id') id: string,
    @Body() updateHotelDto: CreateHotelDto,
  ): Promise<HotelInterfaceResponse | null> {
    return this.hotelService.updateHotelnew(id, updateHotelDto);
  }



  @Roles(Role.Admin)
  @UseGuards(JwtGuard, RoleGuard)
  @ApiOkResponse({ description: 'Successfully retrieved hotel.' })
  @ApiNotFoundResponse({ description: 'Hotel not found.' })
  @Delete('deletebyid/:id')
  async deleteHotel(@Param('id') id: string): Promise<HotelInterfaceResponse | null> {
    return this.hotelService.deleteHotelnew(id);
  }
}