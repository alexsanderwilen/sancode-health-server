import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post('signup')
    async signup(
        @Body('fullName') fullName: string,
        @Body('email') email: string,
        @Body('password') password: string,
    ) {
        return this.authService.signup(fullName, email, password);
    }

    @Post('login')
    async login(
        @Body('email') email: string,
        @Body('password') password: string,
    ) {
        return this.authService.login(email, password);
    }

    @Post('refresh')
    async refreshTokens(
        @Body('userId') userId: number,
        @Body('refreshToken') refreshToken: string,
    ) {
        return this.authService.refreshTokens(userId, refreshToken);
    }
}
