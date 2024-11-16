import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
    ) { }

    async signup(fullName: string, email: string, password: string): Promise<User> {
        const hashedPassword = await bcrypt.hash(password, 10);
        return this.prisma.user.create({
            data: {
                fullName,    
                email,
                password: hashedPassword,
            },
        });
    }

    async login(email: string, password: string) {
        const user = await this.prisma.user.findUnique({ where: { email } });
        if (!user) throw new UnauthorizedException('Invalid credentials');

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid)
            throw new UnauthorizedException('Invalid credentials');

        const accessToken = this.jwtService.sign({
            sub: user.id,
            email: user.email,
        });
        const refreshToken = this.jwtService.sign(
            { sub: user.id, email: user.email },
            { expiresIn: '7d' },
        );

        await this.prisma.user.update({
            where: { id: user.id },
            data: { refreshToken },
        });

        return { accessToken, refreshToken };
    }

    async refreshTokens(userId: number, refreshToken: string) {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user || user.refreshToken !== refreshToken) {
            throw new UnauthorizedException('Invalid refresh token');
        }

        const newAccessToken = this.jwtService.sign({
            sub: user.id,
            email: user.email,
        });
        const newRefreshToken = this.jwtService.sign(
            { sub: user.id, email: user.email },
            { expiresIn: '7d' },
        );

        await this.prisma.user.update({
            where: { id: userId },
            data: { refreshToken: newRefreshToken },
        });

        return { accessToken: newAccessToken, refreshToken: newRefreshToken };
    }
}
