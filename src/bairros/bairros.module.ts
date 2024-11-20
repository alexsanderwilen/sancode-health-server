import { Module } from '@nestjs/common';
import { BairrosService } from './bairros.service';
import { BairrosController } from './bairros.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [BairrosService, PrismaService],
  controllers: [BairrosController]
})
export class BairrosModule {}
