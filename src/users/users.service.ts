import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from './interfaces/user.interface';
import { constants as c } from '../common/constants';

@Injectable()
export class UsersService {
  private users: User[] = [];

  constructor() {
    this.users.push({
      name: 'admin',
      email: 'admin@gmail.com',
      password: c.admin.hashedPw,
    });
  }

  public async findOneOrThrow(email: string) {
    const user = this.users.find((user) => user.email === email);

    if (!user) throw new NotFoundException('user not found');
    else return user;
  }

  public async addUser(user: User) {
    const { email } = user;

    try {
      await this.findOneOrThrow(email);
    } catch (e) {
      this.users.push({
        ...user,
        password: await bcrypt.hash(user.password, c.hashSalt),
      });
      return { ...user, password: undefined };
    }

    throw new ForbiddenException('email already in use');
  }

  public async removeUser(email: string) {
    await this.findOneOrThrow(email);

    this.users = this.users.filter((user) => user.email !== email);

    return { message: 'success' };
  }

  public async getUsers() {
    return this.users.map((user) => ({ ...user, password: undefined }));
  }
}
