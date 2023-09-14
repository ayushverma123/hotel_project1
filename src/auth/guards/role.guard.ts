import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/entities/customer.schema'; // Assuming you have access to the Role enum

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoleArray = this.reflector.get<Role>('role', context.getHandler());
    console.log(requiredRoleArray);

   
    if (!requiredRoleArray) {
      // No role requirement, allow access
      return true;
    } 
    const requiredRole = requiredRoleArray[0];
    const request = context.switchToHttp().getRequest();
    const user = request.user.user; // Assuming you set the user object in the request during authentication
    console.log(user.role);
    if (!user || !user.role ||( user.role !== requiredRole)) {
      // Unauthorized based on role
      return false;
    }

    return true;
  }
}