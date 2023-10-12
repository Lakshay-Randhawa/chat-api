import { JwtService } from '@nestjs/jwt';
import { Body, ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import * as argon from 'argon2';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

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

    if (!user) {
      throw new ForbiddenException('Invalid credentials');
    }

    const isPasswordValid = await argon.verify(user.hash, password);

    if (!isPasswordValid) {
      throw new ForbiddenException('Invalid credentials');
    }

    const payLoad = { sub: user.id, email: user.email };

    return this.signToken(payLoad);
  }

  async signToken(payload: Object) {
    const token = await this.jwtService.signAsync(payload, {
      secret: this.configService.get('JWT_SECRET'),
      expiresIn: '1d',
    });

    console.log(token);
    return { access_token: token };
  }
}
