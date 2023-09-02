import { Body, ForbiddenException, Injectable } from '@nestjs/common';
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
      return error;
    }
  }

  async signin(body: any) {
    const { password, email } = body;

    const user = await this.prisma.user.findUnique({
      where: { email: email },
    });

    console.log({ user });
    if (!user) {
      throw new ForbiddenException('Invalid credentials');
    }

    const isPasswordValid = await argon.verify(user.hash, password);

    console.log({ isPasswordValid });
    if (!isPasswordValid) {
      throw new ForbiddenException('Invalid credentials');
    }

    return user;
  }
}
