import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtGuard extends AuthGuard('jwt') {
    canActivate(context) {
      const request = context.switchToHttp().getRequest();
      console.log('JwtAuthGuard - canActivate - request.headers:', request.headers);
      return super.canActivate(context);
    }
  }
