import { Body, Controller, Get, Post } from '@nestjs/common';
import { LoginCredentials, User } from 'src/users/interfaces/user.interface';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  login(@Body() credentials: LoginCredentials) {
    return this.authService.login(credentials);
  }

  @Post('/signup')
  signUp(@Body() newUser: User) {
    return this.authService.signUp(newUser);
  }

  @Get('/users')
  fetchUsers() {
    return this.authService.getUsers();
  }
}
