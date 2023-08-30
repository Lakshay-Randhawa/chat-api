import { Body, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon from 'argon2';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  async signup(body: any) {
    const hash = await argon.hash(body.password);

    try {
      const user = await this.prisma.user.create({
        data: {
          name: body.name,
          hash,
          email: body.email,
        },
      });

      return user;
    } catch (error) {
      //   return error.status(400).json({ message: error.message });
    }
  }

  async signin() {
    console.log('signin');
    return 'This action signs in a user';
  }
}
