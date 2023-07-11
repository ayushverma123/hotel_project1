import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
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
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return await this.authService.login(req.user);
  }

  @Post('register')
  async registerUser(@Body() createUserDto: CreateCustomerDto) {
    return await this.userService.create(createUserDto);
  }
}
