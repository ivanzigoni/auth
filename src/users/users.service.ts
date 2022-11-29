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
    const admin = new User({
      name: 'admin',
      email: 'admin@gmail.com',
      password: c.admin.hashedPw,
    });
    this.users.push(admin);
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
      // const newUser = {
      //   ...user,
      //   password: await bcrypt.hash(user.password, c.hashSalt),
      // };
      const newUser = new User({
        ...user,
        password: await bcrypt.hash(user.password, c.hashSalt),
      });
      this.users.push(newUser);
      return newUser;
    }

    throw new ForbiddenException('email already in use');
  }

  public async removeUser(email: string) {
    await this.findOneOrThrow(email);

    this.users = this.users.filter((user) => user.email !== email);

    return { message: 'success' };
  }

  public async getUsers() {
    console.log(this.users[0]);
    return this.users;
  }
}
