import { ForbiddenException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { constants as c } from '../common/constants';
import { LoginCredentials, User } from 'src/users/interfaces/user.interface';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  public async login({ email, password }: LoginCredentials) {
    const foundUser = await this.userService.findOneOrThrow(email);

    const pwIsValid = await bcrypt.compare(password, foundUser.password);

    if (pwIsValid) {
      const token = this.jwtService.sign(
        { email },
        { expiresIn: '15m', secret: c.jwtSecret },
      );
      return { token };
    } else {
      throw new ForbiddenException('incorrect credentials');
    }
  }

  public async signUp(user: User) {
    const { email } = await this.userService.addUser(user);

    const token = this.jwtService.sign(
      { email },
      { expiresIn: '15m', secret: c.jwtSecret },
    );

    return {
      token,
      email,
    };
  }

  public async getUsers() {
    return this.userService.getUsers();
  }
}
