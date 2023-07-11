import { Controller, Get, Post, Put, Delete, Param, Body , Query, UseGuards} from '@nestjs/common';
import { CreateCustomerDto } from './dto/createCustomer-dto';
import { CustomerService } from './customer.service';
import { Customer } from '../entities/customer.schema';
import { GetQueryDto } from './dto/query-dto';
import { CustomerInterfaceResponse } from './interface/CustomerResponse.interface';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';

@UseGuards(JwtGuard)
@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @Get('getalll')
  async getAllBlogs()  {
    return this.customerService.getAllCustomers();
  }
  
  @Get('getall')
  async getCustomers(
    @Query() queryDto: GetQueryDto,
  ): Promise<Customer[]> {
    if (queryDto.search || queryDto.limit || queryDto.fromDate || queryDto.toDate || queryDto.pageNumber || queryDto.pageSize) {
      return this.customerService.getFilteredCustomers(queryDto);
    } else {
      return this.customerService.getAllCustomers();
    }
  }

  @Get('getbyid/:id')
  async getCustomerById(@Param('id') id: string): Promise<CustomerInterfaceResponse | null> {
    return this.customerService.getCustomerById(id);
  }


  @Post('create')
  async createCustomer(@Body() createCustomerDto: CreateCustomerDto): Promise<Customer> {
    return this.customerService.create(createCustomerDto);
  }

  @Put('updatebyid/:id')
  async updateCustomer(
    @Param('id') id: string,
    @Body() updateCustomerDto: CreateCustomerDto,
  ): Promise<CustomerInterfaceResponse | null> {
    return this.customerService.updateCustomer(id, updateCustomerDto);
  }

  @Delete('deletebyid/:id')
  async deleteCustomer(@Param('id') id: string): Promise<CustomerInterfaceResponse| null> {
    return this.customerService.deleteCustomer(id);
  }
}