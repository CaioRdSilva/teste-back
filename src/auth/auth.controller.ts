import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterUserDto } from 'src/DTO/registerUser.dto';
import { UserLoginDto } from 'src/DTO/userLogin.dto';

//http://localhost:3000/auth
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  //(Registro do usuario) http://localhost:3000/auth/register
  @Post('register')
  registration(@Body(ValidationPipe) regDTO: RegisterUserDto) {
    return this.authService.registerUser(regDTO);
  }
  //(Login do usuario) http://localhost:3000/auth/login
  @Post('login')
  singin(@Body(ValidationPipe) LoginDTO: UserLoginDto) {
    return this.authService.loginUser(LoginDTO);
  }
}
