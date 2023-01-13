import {
  AuthService
} from './auth.service';
import {
  Controller,
  Request,
  UseGuards,
  Post
} from '@nestjs/common';
import {
  AuthGuard
} from '@nestjs/passport';
import { UsersService } from 'src/users/users.service';
import { Request as ExpressRequest } from 'express';

@Controller('api/auth')
export class AuthController {
  constructor(
    private authService: AuthService,
  ) { }


  @UseGuards(AuthGuard('local'))
  @Post(`login`)
  async login(@Request() req: any) {
    return this.authService.loginUser(req.body);
  }
}