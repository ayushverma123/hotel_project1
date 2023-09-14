import { BadRequestException,NotFoundException } from '@nestjs/common/exceptions';
import { Model } from 'mongoose';
import { Otp } from 'src/entities/otp.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';
import { CustomerService } from 'src/customer/customer.service';
import * as bcrypt from 'bcrypt';
import { Customer } from 'src/entities/customer.schema';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: CustomerService,
    private jwtService: JwtService,
    @InjectModel('Otp') private readonly otpModel: Model<Otp>,
    @InjectModel('Customer') private readonly customerModel: Model<Customer>
  ) { }

  async validateUser(username: string, password: string) {

    const user = await this.userService.findOneWithUserName(username);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  /*
  async login(user: any) {
    // Extract the role property from the user object
    const userRole = user._doc.role;
  
    // Create the payload for the JWT token
    const payload = { role: userRole };
  
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
  */

  async login(user: any) {
    // Extract the role property from the user object using _doc
    const userRole = user._doc.role;
  
    // Create the payload for the JWT token
    const payload = { role: userRole };
  
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }


  async generateOtp(email: string): Promise<string> {
    const otp = Math.floor(100000 + Math.random() * 900000);

    const check_email = await this.customerModel.findOne({ email });

    if (!check_email) {
      throw new NotFoundException('Invalid email');
    }

    await this.otpModel.create({ email, otp });

    return otp.toString();
  }

  async verifyOtpAndResetPassword(email: string, otp: string, newPassword: string) {
    const otpEntry = await this.otpModel.findOne({ email, otp });

    if (!otpEntry) {
      throw new NotFoundException('Invalid OTP');
    }

    // Update the customer's password
    // const hashedPassword = await bcrypt.hash(newPassword, 10);
    await this.userService.updatePassword(email, newPassword);

    // Delete the OTP entry
    await this.otpModel.deleteOne({ _id: otpEntry._id });

    // Return the updated user object
    const updatedUser = { email, password: newPassword }; // Assuming the user object has 'email' property
    return updatedUser;
  }
}