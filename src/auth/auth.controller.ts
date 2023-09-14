import { ApiTags } from '@nestjs/swagger';
import * as jwt from 'jsonwebtoken';
import { Customer } from 'src/entities/customer.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common/exceptions';
import { UnauthorizedException, InternalServerErrorException, NotFoundException } from '@nestjs/common/exceptions';
import { Body, Controller, Post, Request, UseGuards, Put, Query, Get, Req, Param, Response } from '@nestjs/common';
import { CreateCustomerDto } from 'src/customer/dto/createCustomer-dto';
import { CustomerService } from 'src/customer/customer.service';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RefreshJwtGuard } from './guards/refresh-auth.guard';
import { JwtGuard } from './guards/jwt-auth.guard';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: CustomerService,

  ) { }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return await this.authService.login(req.user);
  }

  @UseGuards(JwtGuard) // Protect this route using LocalAuthGuard
  @Get('getlogininfo')
  getProfile(@Request() req) {
    // Access the email property from the user object
    //console.log('getProfile - User Email:', email);
    const id = req.user.user.role;
    console.log(id);
    const loggedUser = this.userService.getCustomerById1(id);
    return loggedUser;
  }


  @UseGuards(JwtGuard)
  @Post('login-after-reset')
  async loginAfterReset(@Request() req) {
    const user = req.user; // Get the user object from the request
    // Call the login method in the AuthService to generate a new token
    // console.log(user);

    const token = await this.authService.login(user);

    // Return the token in the response
    return { message: 'Logged in after password reset', token };
  }


  @Post('register')
  async registerUser(@Body() createUserDto: CreateCustomerDto) {
    return await this.userService.create(createUserDto);
  }


  @Post('forgot-password')
  async generateOtp(@Body() body: { email: string }) {
    const { email } = body;
    const otp = await this.authService.generateOtp(email);
    return { message: 'OTP generated successfully', otp };
  }

  @Put('reset-password')
  async verifyOtpAndResetPassword(@Body() body: { email: string, otp: string, newPassword: string }) {
    const { email, otp, newPassword } = body;

    // Verify OTP and reset password
    const updatedUser = await this.authService.verifyOtpAndResetPassword(email, otp, newPassword);
    if (updatedUser) {
      return { message: 'Password reset successfully', user: updatedUser };
    }
    else {
      throw new NotFoundException("Cannot reset password");

    }
  }


}