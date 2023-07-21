import { NotFoundException } from '@nestjs/common/exceptions';
import { ValidationPipe } from '@nestjs/common';
import { UsePipes } from '@nestjs/common';
import { Controller, Get, Post, Put, Delete, Param, Body , Query, UseGuards} from '@nestjs/common';
import { CreateCustomerDto } from './dto/createCustomer-dto';
import { CustomerService } from './customer.service';
import { Customer } from '../entities/customer.schema';
import { GetQueryDto } from './dto/query-dto';
import { CustomerInterfaceResponse } from './interface/CustomerResponse.interface';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';


@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  
  @UseGuards(JwtGuard)
  @Get('getall')
  async getCustomers(
    @Query() queryDto: GetQueryDto,
  ): Promise<any> {
    if (queryDto.search || queryDto.limit || queryDto.fromDate || queryDto.toDate || queryDto.pageNumber || queryDto.pageSize  || queryDto.sortField || queryDto.sortOrder) {
      return this.customerService.getFilteredCustomers(queryDto);
    } else {
      return this.customerService.getAllCustomers();
    }
  }

  @UseGuards(JwtGuard)
  @Get('getbyid/:id')
  async getCustomerById(@Param('id') id: string): Promise<CustomerInterfaceResponse | null> {
    return this.customerService.getCustomerById(id);
  }

  @UsePipes(new ValidationPipe())
  @Post('create')
  async createCustomer(@Body() createCustomerDto: CreateCustomerDto): Promise<Customer> {
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
  @Put('change-password')
  async changerCustomerPassword(@Body() body: { email: string, newPassword: string }): Promise<any>{
    const { email, newPassword } = body;
    
    // Verify OTP and reset password
    const User=await this.customerService.SeeUserExist(email);
    if(User){
    const Password= await this.customerService.updatePassword(email, newPassword);
    return { message:'Password changed successfully', Password}
    }
    else{
      throw new NotFoundException("Cannot reset password");

    }
    //const updatedUser = await this.customerService.updatePassword(email, newPassword);
    /*if(updatedUser)
    {
    return { message: 'Password changed successfully', user: updatedUser };
  }
   else
{
    throw new NotFoundException("Cannot reset password");

}
}
*/
  }

  

  @UseGuards(JwtGuard)
  @Delete('deletebyid/:id')
  async deleteCustomer(@Param('id') id: string): Promise<CustomerInterfaceResponse| null> {
    return this.customerService.deleteCustomer(id);
  }

  @Get('getallemails')
  async getAllCustomerEmails(): Promise<string[]> {
    return this.customerService.getAllCustomerEmails();
  }
  
}