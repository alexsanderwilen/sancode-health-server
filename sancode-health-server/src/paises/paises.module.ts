import { Module } from '@nestjs/common';
import { PaisesController } from './paises.controller';
import { PaisesService } from './paises.service';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [PaisesService, PrismaService],
  controllers: [PaisesController],
})
export class PaisesModule {}
