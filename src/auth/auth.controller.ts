import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  UseInterceptors,
} from '@nestjs/common';
// import { OutputInterceptor } from 'src/common/interceptors/ouput.interceptor';
import { LoginCredentials, User } from 'src/users/interfaces/user.interface';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  login(@Body() credentials: LoginCredentials) {
    return this.authService.login(credentials);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Post('/signup')
  signUp(@Body() newUser: User) {
    return this.authService.signUp(newUser);
  }

  @UseInterceptors(ClassSerializerInterceptor)
  @Get('/users')
  fetchUsers() {
    return this.authService.getUsers();
  }
}
