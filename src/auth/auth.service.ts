import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  signup() {
    return 'This action registers a new user';
  }

  async signin() {}
}
