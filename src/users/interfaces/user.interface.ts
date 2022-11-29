import { Exclude, Expose } from 'class-transformer';

// export interface User {
//   name: string;
//   email: string;
//   password?: string;
// }

export interface LoginCredentials {
  email: string;
  password: string;
}

export class User {
  name: string;
  email: string;
  @Exclude()
  password?: string;

  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
  }

  @Expose()
  get fullName(): string {
    return `${this.name} locura`;
  }
}
