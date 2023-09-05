import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersSerivce: UsersService) {}

  @Get('all')
  getAllUsers() {
    return this.usersSerivce.getAllUsers();
  }
}
