import { OtpSchema } from 'src/entities/otp.schema';
import { FrontendCustomerModule } from 'src/frontend_customer/frontend_customer.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { CustomerService } from 'src/customer/customer.service';
import { JwtModule, } from '@nestjs/jwt';
import { LocalStrategy } from './stratagies/local.strategy'
import { Customer } from 'src/entities/customer.schema';
import { CustomerSchema } from 'src/entities/customer.schema';
import { JwtStrategy } from './stratagies/jwt.strategy';


@Module({
    providers: [
        AuthService,
        CustomerService,
        JwtStrategy,
        LocalStrategy,

    ],
    controllers: [AuthController],
    imports: [MongooseModule.forFeature([{ name: 'Customer', schema: CustomerSchema }, { name: 'Otp', schema: OtpSchema }]),
    JwtModule.register({
        secret: `${process.env.jwt_secret}`,
        signOptions: { expiresIn: '6000s' },
    }),
    ],
})
export class AuthModule { }