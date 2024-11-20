import { Module } from '@nestjs/common';
import { EstadosService } from './estados.service';
import { EstadosController } from './estados.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [EstadosService, PrismaService],
  controllers: [EstadosController]
})
export class EstadosModule {}
