import { Role } from '../entities/customer.schema';
import { Roles } from 'src/auth/guards/roles.decorator';
import { RoleGuard } from 'src/auth/guards/role.guard';             
import { Request } from '@nestjs/common/decorators';
import { ApiOkResponse, ApiNotFoundResponse } from '@nestjs/swagger';
import { ApiCreatedResponse, ApiForbiddenResponse } from '@nestjs/swagger';
import { ApiTags } from '@nestjs/swagger';
import { NotFoundException } from '@nestjs/common/exceptions';
import { ValidationPipe } from '@nestjs/common';
import { UsePipes } from '@nestjs/common';
import { Controller, Get, Post, Put, Delete, Param, Body, Query, UseGuards } from '@nestjs/common';
import { CreateCustomerDto } from './dto/createCustomer-dto';
import { CustomerService } from './customer.service';
import { Customer } from '../entities/customer.schema';
import { GetQueryDto } from './dto/query-dto';
import { CustomerInterfaceResponse } from './interface/CustomerResponse.interface';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';



@ApiTags('Customers')
@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) { }


  @UseGuards(JwtGuard)
  @Get('getall')
  async getCustomers(@Query() queryDto: GetQueryDto): Promise<any> {
    return this.customerService.getFilteredCustomers(queryDto);
  }


  @ApiOkResponse({ description: 'Successfully retrieved customer.' })
  @ApiNotFoundResponse({ description: 'Customer not found.' })
  @Roles(Role.Admin)
  @UseGuards(JwtGuard, RoleGuard)
  @Get('getbyid/:id')
  async getCustomerById(@Param('id') id: string): Promise<CustomerInterfaceResponse | null> {
    return this.customerService.getCustomerById(id);
  }

  @ApiCreatedResponse({ description: 'The record has been successfully created.' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @UsePipes(new ValidationPipe())
  @Post('create')
  async createCustomer(@Body() createCustomerDto: CreateCustomerDto): Promise<CustomerInterfaceResponse> {
    return this.customerService.create(createCustomerDto);
  }

  /*
  @UseGuards(JwtGuard)
  @Put('changePassword/:id')
  async changePasswordCustomer(
    @Param('id') id: string,
    @Body() updateCustomerDto: CreateCustomerDto,
  ): Promise<CustomerInterfaceResponse | null> {
    return this.customerService.changePasswordCustomer(id, updateCustomerDto);
  }
  */


  @ApiOkResponse({ description: 'Successfully retrieved customer.' })
  @ApiNotFoundResponse({ description: 'Customer not found.' })
  @UseGuards(JwtGuard)
  @UsePipes(new ValidationPipe())
  @Put('updatebyid/:id')
  async updateCustomer(
    @Param('id') id: string,
    @Body() updateCustomerDto: CreateCustomerDto,
  ): Promise<CustomerInterfaceResponse | null> {
    return this.customerService.updateCustomer(id, updateCustomerDto);
  }

  @UseGuards(JwtGuard)
  @Put('changepassword')
  async changerCustomerPassword(@Body() body: { email: string, newPassword: string }): Promise<any> {
    const { email, newPassword } = body;

    // Verify OTP and reset password
    const User = await this.customerService.SeeUserExist(email);
    if (User) {
      const Password = await this.customerService.updatePassword(email, newPassword);
      return { message: 'Password changed successfully', Password }
    }
    else {
      throw new NotFoundException("Cannot reset password");

    }

  }

  @UseGuards(JwtGuard) // Protect this route using LocalAuthGuard
  @Put('change-password')
  async changePassword(@Body() body: {newpassword: string },@Request() req) {
    // Access the email property from the user object
    //console.log('getProfile - User Email:', email);
    const {newpassword}=body;
    const id = req.user.user.email;
    console.log(id);
    if(id)
    {
    const password=await this.customerService.updatePassword1(id, newpassword)
    console.log(password);
  
    }
    return {message:"Password changed successfully", newpassword};
  
  }
  

  @ApiOkResponse({ description: 'Successfully retrieved customer.' })
  @ApiNotFoundResponse({ description: 'Customer not found.' })
  @UseGuards(JwtGuard)
  @Delete('deletebyid/:id')
  async deleteCustomer(@Param('id') id: string): Promise<CustomerInterfaceResponse | null> {
    return this.customerService.deleteCustomer(id);
  }

  @Get('getallemails')
  async getAllCustomerEmails(): Promise<string[]> {
    return this.customerService.getAllCustomerEmails();
  }

}