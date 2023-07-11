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
}