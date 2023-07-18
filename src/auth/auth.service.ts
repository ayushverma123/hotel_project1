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
    console.log(password);
    if (user && (await bcrypt.compare(password, user.password))) {
      console.log(user.password);
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
   // console.log(user);
    const accessToken = this.jwtService.sign(payload);
   // console.log(accessToken);

    
    const { password, ...userWithoutPassword } = user;
   // console.log(user);
    const access_customer = { ...userWithoutPassword }; 
     // Use the modified user object without the password field

    await this.accessModel.create({access_customer });
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }

  async getAllCustomersAccessTokens(): Promise<Access[]> {
    return this.accessModel.find().exec();
  }

  async getAllCustomers(): Promise<Access[]> {
    return this.accessModel.find({}, { password: 0 }).exec();
  }

  /*
  async fetchCustomerWithAccessToken(user: Customer) {

    const access_token = await this.login(user);
    const emailTostore = user.email;
    console.log(emailTostore);
    await this.accessModel.create({emailTostore, access_token});
    
    

  }
  */

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