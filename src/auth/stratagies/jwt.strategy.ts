import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt'

export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: `${process.env.jwt_secret}`,
    });
  }

  async validate(payload: any) {
<<<<<<< HEAD
    return { user: payload };
=======
     console.log('JWT Payload:', payload);
   return { user: payload.sub, username: payload.username };
>>>>>>> f757dfab381a218e81058679471a150da054826f
  }
}
