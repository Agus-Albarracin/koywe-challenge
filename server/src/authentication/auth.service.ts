import { Injectable, UnauthorizedException, ConflictException} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../modules/user/user.service';
import { Response } from 'express';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signup(email: string, password: string, username: string) {  
    const existeEmail = await this.userService.findByEmail(email);  
    if (existeEmail) {  
      throw new ConflictException('El email ya está registrado');  
    }  
  
    const existeUUsername = await this.userService.findByUsername(username);  
    if (existeUUsername) {  
      throw new ConflictException('El nombre de usuario ya está en uso');  
    }  
    
    const hashedPassword = await bcrypt.hash(password, 10);  
    const user = await this.userService.create({ email, password: hashedPassword, username });  
    return { message: 'Se creo el usuario exitosamente', user };  
  }

  async signin(username: string, password: string, res: Response): Promise<{ access_token: string }> { 
    const user = await this.userService.findByUsername(username);  

    if (!user) {  
      throw new UnauthorizedException('Credenciales de usuario inválidas');  
    }  

    const compare = await bcrypt.compare(password, user.password);  

    if (!compare) {  
      throw new UnauthorizedException('Credenciales de password inválidas');  
    }  

    const payload = { sub: user.id, email: user.email };  
    const token = this.jwtService.sign(payload, { expiresIn: '1h' });

    res.cookie('access_token', token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: false,
      maxAge: 600000, // 10 minutos
    });

    return { access_token: token };  
  } 
}
