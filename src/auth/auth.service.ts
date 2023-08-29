import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  async signup() {
    return 'This action registers a new user';
  }

  async signin() {
    console.log('signin');
    return 'This action signs in a user';
  }
}
