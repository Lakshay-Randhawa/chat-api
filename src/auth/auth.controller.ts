import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  // Create a dto type for the body rather than any
  @Post('signup')
  signup(@Body() body: any) {
    return this.authService.signup(body);
  }

  @Post('signin')
  async signin(@Body() body: any) {
    return this.authService.signin(body);
  }
}
