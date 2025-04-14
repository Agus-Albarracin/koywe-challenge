/**
* AuthController
* 
*
* Nota: 
* 
* Signin:
* - Valida las credenciales a través del `AuthService`.
* - Si son correctas, genera un JWT y lo devuelve en una cookie llamada `access_token`.
* - La cookie es `httpOnly` para protegerla del acceso vía JavaScript.
* - `secure` y `sameSite` estan configuradas para entorno de desarrollo.
* 
* Logout:
* - Elimina la cookie `access_token` que contiene el JWT del usuario.
* - La cookie se configura como `httpOnly` para evitar acceso desde JavaScript en el cliente.
* - `sameSite: 'lax'` ayuda a prevenir ataques CSRF sin bloquear solicitudes legítimas de navegación.
* - `secure: false` indica que la cookie puede ser enviada por HTTP, 
*   pero debe configurarse como `true` en producción con HTTPS (sugerido manejar con variable de entorno).
* - No requiere body, ya que solo limpia la cookie de sesión.
* 
*/
import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() dto: { email: string; password: string; username: string }) {
    return this.authService.signup(dto.email, dto.password, dto.username);
  }

  @Post('signin')
  async signin(
    @Body() dto: { username: string; password: string },
    @Res({ passthrough: true }) res: Response,) {
    const { access_token } = await this.authService.signin(dto.username, dto.password, res);
    return { message: 'Inicio de sesión exitoso' };
  }

  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    res.clearCookie('access_token', {
      httpOnly: true,
      sameSite: 'lax',
      secure: false, // Podemos manejarlo con .env
    });
    return { message: 'Sesión cerrada correctamente' };
  }
}
