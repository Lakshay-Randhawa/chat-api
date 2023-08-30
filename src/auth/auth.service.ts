import { Body, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  async signup(body: any) {
    const user = await this.prisma.user.create({
      data: {
        name: body.name,
        hash: body.password,
        email: body.email,
      },
    });
    console.log({ body });
    // console.log(user);
    return user;
  }

  async signin() {
    console.log('signin');
    return 'This action signs in a user';
  }
}
