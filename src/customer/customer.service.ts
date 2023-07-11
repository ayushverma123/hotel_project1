import { CustomerInterfaceResponse } from './interface/CustomerResponse.interface';
import { InternalServerErrorException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Customer } from '../entities/customer.schema';
import { CreateCustomerDto } from './dto/createCustomer-dto';
import { GetQueryDto } from './dto/query-dto';

@Injectable()
export class CustomerService {
  constructor(@InjectModel('Customer') private readonly customerModel: Model<Customer>) { }

  /*
  async createCustomer(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    const createdCustomer = new this.customerModel(createCustomerDto);

    if (!createdCustomer) {
      throw new InternalServerErrorException('Unable to create hotel');
    }

    return createdCustomer.save();
  }  */

  async create(createCustomerDto: CreateCustomerDto): Promise<Customer> {
    const createdCustomer = await this.customerModel.create(createCustomerDto);
    return createdCustomer.save();
  }


  async getAllCustomers(): Promise<Customer[]> {
    return this.customerModel.find().exec();
  }

  async getFilteredCustomers(queryDto: GetQueryDto): Promise<Customer[]> {
    const { search, limit, pageNumber, pageSize, fromDate, toDate } = queryDto;
    const query = this.customerModel.find();


    if (search) {
      query.or([
        { firstName: { $regex: search, $options: 'i' } },
        { lastName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { gender: { $regex: search, $options: 'i' } },

      ]);
    }

    if (pageNumber && pageSize) {
      const skip = (pageNumber - 1) * pageSize;
      query.skip(skip).limit(pageSize);
    }

    if (fromDate && toDate) {
      query.where({
        date_of_birth: {
          $gte: new Date(fromDate),
          $lte: new Date(toDate),
        },
      });
    }

    return query.exec();

  }

  async getCustomerById(id: string): Promise<CustomerInterfaceResponse | null> {
    const customerbyId = await this.customerModel.findById(id).exec();

    if (!customerbyId) {
      throw new InternalServerErrorException('Unable to find Customer');
    }

    return {
      code: 200,
      message: 'Customer found successfully',
      status: 'success',
      data: customerbyId,
    };
  }

  async findOneWithUserName(username: string) {
    
    return await this.customerModel.findOne({ email: username });
    
  }

  async updateCustomer(id: string, updateCustomerDto: CreateCustomerDto): Promise<CustomerInterfaceResponse | null> {

    const updatedCustomer = await this.customerModel.findByIdAndUpdate(id, updateCustomerDto, { new: true }).exec();

    if (!updatedCustomer) {
      throw new InternalServerErrorException('Unable to update Customer');
    }

    return {
      code: 200,
      message: 'Customer updated successfully',
      status: 'success',
      data: updatedCustomer,
    };
  }


  async deleteCustomer(id: string): Promise<CustomerInterfaceResponse | null> {
    //  return this.hotelModel.findByIdAndDelete(id).exec();
    const deletedCustomer = await this.customerModel.findByIdAndDelete(id);

    if (!deletedCustomer) {
      throw new InternalServerErrorException('Unable to delete Customer');
    }

    return {
      code: 200,
      message: 'Customer deleted successfully',
      status: 'success',
      data: deletedCustomer,
    };
  }
}



