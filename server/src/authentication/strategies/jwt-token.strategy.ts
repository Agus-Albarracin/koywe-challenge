import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),  
      secretOrKey: process.env.JWT_SECRET || (() => {  
        throw new Error('JWT_SECRET is not defined in environment variables');  
      })(),  
      ignoreExpiration: false,  
    });
  }

  async validate(payload: { sub: string; email: string }) {
    return payload;
  }
}
