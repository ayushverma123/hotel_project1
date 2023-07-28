import { ApiTags } from '@nestjs/swagger';
import { JwtPayload } from './jwt-payload.interface';
import * as jwt from 'jsonwebtoken';
import { Customer } from 'src/entities/customer.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common/exceptions';
import { Access } from 'src/entities/access.schema';
import { UnauthorizedException, InternalServerErrorException, NotFoundException } from '@nestjs/common/exceptions';
import { Body, Controller, Post, Request, UseGuards, Put, Query, Get, Req, Param } from '@nestjs/common';
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
    @InjectModel('Access') private readonly accessModel: Model<Access>,

  ) { }
  /*
  @Get('accessModel')
  async getUserAccessModel(@Request() request: any) {
    const authorization = request.headers.authorization;

    if (!authorization || !authorization.startsWith('Bearer ')) {
      throw new UnauthorizedException('Invalid or missing token');
    }

    const token = authorization.split(' ')[1];
    
    try {
      // Verify and decode the token using the appropriate secret key
      const decodedToken = jwt.verify(token, 'secretjwt4565') as JwtPayload;
      const userEmail = decodedToken.email; // Assuming your JWT payload contains the user's email
      console.log(userEmail);
      // Use the userEmail to fetch the accessModel record
      const userRecord = await this.accessModel.findOne({ "User.email": userEmail });

      if (!userRecord) {
        throw new NotFoundException('User record not found');
      }

      return userRecord;
    } catch (err) {
      throw new UnauthorizedException('Invalid token');
    }
  }
*/
/*
@UseGuards(JwtGuard) // Protect this route using JwtAuthGuard
@Get('profile')
getProfile(@Request() req) {
  console.log('getProfile - req.user:', req.user);
  return req.user;
}
*/ 


@UseGuards(JwtGuard) // Protect this route using LocalAuthGuard
@Get('profile')
getProfile(@Request() req) {
   // Access the email property from the user object
  //console.log('getProfile - User Email:', email);
  return req.user;
}
/*
  @Get('/getlogininfo') 
  async getLoginInfo(@Req() req: any) {
    console.log(req.user);
    return { req };
  }

  /*

    @Get('accessModel')
    async getUserAccessModel(@Request() request: any) {
      const authorization = request.headers.authorization;
  
      if (!authorization || !authorization.startsWith('Bearer ')) {
        throw new UnauthorizedException('Invalid or missing token');
      }
  
      const token = authorization.split(' ')[1];
  
      // Decode the token without verifying the signature
      const decodedToken = jwt.decode(token) as any;
      
      // Check if the 'sub' property exists
      if (!decodedToken.sub || typeof decodedToken.sub !== 'object') {
        throw new UnauthorizedException('Invalid token or missing sub object');
      }
  
      // Extract the email from the nested 'sub' object in the decoded token
      const userEmail = decodedToken.sub.email;
      console.log(userEmail);
      // Use the userEmail to fetch the accessModel record
      const userRecord = await this.accessModel.findOne({ "User.email": userEmail });
  
      if (!userRecord) {
        throw new NotFoundException('User record not found');
      }
  
      return userRecord;
    }
  

*/



  /*
    @Get('getloginInfo')
    async getAllCustomersAccess(@Body() body:{ email:string}) {
      const { email}= body;
      return this.authService.getOneCustomer(email);
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
   // console.log(user);

    const token = await this.authService.login(user);

    // Return the token in the response
    return { message: 'Logged in after password reset' , token};
  }




  @Get('getlogininfo/:email')
  async getUsersByEmail(@Param('email') email: string) {
    try {
      const users = await this.authService.getUsersByEmail(email);
      if (!users || users.length === 0) {
        throw new NotFoundException('No users found for the provided email.');
      }
      return users;
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch users by email.');
    }
  }
  /* @Get('callAccess')
   async callingAccessRoute() {
     return this.authService.fetchCustomerWithAccessToken(Req.user);
   }
   */

  /*
  @Get('FetloginInfo')
  async getUsersByEmail(@Param('email') email: string) {
    try {
      const users = await this.authService.getUsersByEmail(email);
      if (!users || users.length === 0) {
        throw new NotFoundException('User not found.');
      }
      return users;
    } catch (error) {
      throw new InternalServerErrorException('Failed to fetch users by email.');
    }
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
    if (updatedUser) {
      return { message: 'Password reset successfully', user: updatedUser };
    }
    else {
      throw new NotFoundException("Cannot reset password");

    }
  }


}
