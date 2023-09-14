import { SetMetadata } from '@nestjs/common';
import { Role } from 'src/entities/customer.schema'; // Import the Role enum from your customer model file

export const Roles = (...roles: Role[]) => SetMetadata('role', roles);