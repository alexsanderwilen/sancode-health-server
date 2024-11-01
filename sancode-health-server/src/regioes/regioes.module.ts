import { Module } from '@nestjs/common';
import { RegioesService } from './regioes.service';
import { RegioesController } from './regioes.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [RegioesService, PrismaService],
  controllers: [RegioesController]
})
export class RegioesModule {}
