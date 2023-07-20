import { Access } from 'src/entities/access.schema';
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
    @InjectModel('Access') private readonly accessModel: Model<Access>,
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


  async login(user: Customer) {

    const payload = {
      username: user.email,
      sub: {
        name: user.firstName
        ,
      },
    };
    const User = user; 

    await this.accessModel.create({User });
    
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async getAllCustomers(): Promise<any[]> {
    return this.accessModel.find({}, { '__v': 0, '_id': 0, 'User.password': 0 }).exec();
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
