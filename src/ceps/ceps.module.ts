import { Module } from '@nestjs/common';
import { CepsService } from './ceps.service';
import { CepsController } from './ceps.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [CepsService, PrismaService],
  controllers: [CepsController]
})
export class CepsModule {}
