
import { BadRequestException } from '@nestjs/common/exceptions';
import { Access } from 'src/entities/access.schema';
import { InternalServerErrorException, NotFoundException } from '@nestjs/common/exceptions';
import { Body, Controller, Post, Request, UseGuards, Put, Query, Get, Req } from '@nestjs/common';
import { CreateCustomerDto } from 'src/customer/dto/createCustomer-dto';
import { CustomerService } from 'src/customer/customer.service';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RefreshJwtGuard } from './guards/refresh-auth.guard';


@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: CustomerService,

  ) { }

/*
  @Get('getloginInfo')
  async getAllCustomersAccess() {
    return this.authService.getAllCustomers();
  }
  */
  

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return await this.authService.login(req.user);
  }

  @UseGuards(LocalAuthGuard)
  @Post('login-after-reset')
  async loginAfterReset(@Request() req) {
    const user = req.user; // Get the user object from the request

    // Call the login method in the AuthService to generate a new token
    const token = await this.authService.login(user);

    // Return the token in the response
    return { message: 'Logged in after password reset', token };
  }


  /* @Get('callAccess')
   async callingAccessRoute() {
     return this.authService.fetchCustomerWithAccessToken(Req.user);
   }
   */

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
  /*
    @Put('reset-password')
    async verifyOtpAndResetPassword(@Body() body: { email: string, otp: string, newPassword: string }) {
      const { email, otp, newPassword } = body;
      await this.authService.verifyOtpAndResetPassword(email, otp, newPassword);
      return { message: 'Password reset successfully' };
    }
    */
  @Put('reset-password')
  async verifyOtpAndResetPassword(@Body() body: { email: string, otp: string, newPassword: string }) {
    const { email, otp, newPassword } = body;

    // Verify OTP and reset password
    const updatedUser = await this.authService.verifyOtpAndResetPassword(email, otp, newPassword);

    return { message: 'Password reset successfully', user: updatedUser };
  }


}