import { CustomerSchema } from '../entities/customer.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { CustomerController } from './customer.controller';
import { CustomerService } from './customer.service';


@Module({
  imports: [MongooseModule.forRoot("mongodb+srv://ayushv657:gkczp9LJXpkYnN7u@cluster0.stthbi5.mongodb.net/mydatabase?retryWrites=true&w=majority"),
  MongooseModule.forFeature([{ name: 'Customer', schema: CustomerSchema }]),
  ],
  controllers: [ CustomerController],
  providers: [ CustomerService],
  exports: [CustomerService]
})
export class CustomerModule {}
