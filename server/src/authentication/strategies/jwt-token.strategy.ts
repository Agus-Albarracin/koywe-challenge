/**
 * JwtStrategy
 * 
 * Esta estrategia extiende PassportStrategy y se utiliza para validar tokens JWT 
 * en las rutas protegidas del sistema.
 * 
 *  Responsabilidades:
 * - Extraer el token JWT desde el header Authorization (Bearer token) 
 *   o desde una cookie llamada 'KOWEY-TOKEN-SWAP'.
 * - Utilizar la clave secreta (`JWT_SECRET`) definida en las variables de entorno 
 *   para verificar la validez del token.
 * - Si el token es válido y no ha expirado, expone el payload (sub y email) al contexto de autenticación.
 * 
 * Notas:
 * - Uso combinado de header, JWT y cookie.
 * - Si `JWT_SECRET` no está definido, lanza un error explícito en tiempo de ejecución.
 */
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        ExtractJwt.fromAuthHeaderAsBearerToken(),
        (req: Request) => {
          return req?.cookies?.['KOWEY-TOKEN-SWAP']
        }
      ]),
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
