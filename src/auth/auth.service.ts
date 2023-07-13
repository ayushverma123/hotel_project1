import { NotFoundException } from '@nestjs/common/exceptions';
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
  ) { }
  async validateUser(username: string, password: string) {
    const user = await this.userService.findOneWithUserName(username);

    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }


  async login(user: Customer) {
    const payload = {
      username: user.email,
      sub: {
        name: user.name,
      },
    };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async generateOtp(email: string): Promise<string> {
    const otp = Math.floor(100000 + Math.random() * 900000);

    // Save OTP to the OTP collection
    await this.otpModel.create({ email, otp });

    return otp.toString();
  }
  
  async verifyOtpAndResetPassword(email: string, otp: string, newPassword: string) {
    const otpEntry = await this.otpModel.findOne({ email, otp });
  
    if (!otpEntry) {
      throw new NotFoundException('Invalid OTP');
    }
  
    // Update the customer's password
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await this.userService.updatePassword(email, hashedPassword);
  
    // Delete the OTP entry
    await this.otpModel.deleteOne({ _id: otpEntry._id });
  
    // Return the updated user object
    const updatedUser = { email, password: hashedPassword }; // Assuming the user object has 'email' property
    return updatedUser;
  }
}