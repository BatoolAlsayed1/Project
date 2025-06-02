import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() body: { name: string; email: string; password: string }) {
    return this.authService.signup(body);
  }

  @Post('signin')
  async signin(@Body() body: { email: string; password: string }) {
    return this.authService.signin(body);
  }
  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  getProfile(@Req() req) {
    return req.user; 
  }
}
