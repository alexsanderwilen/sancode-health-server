import { Module } from '@nestjs/common';
import { MunicipiosService } from './municipios.service';
import { MunicipiosController } from './municipios.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({  
  providers: [MunicipiosService, PrismaService],
  controllers: [MunicipiosController]
})
export class MunicipiosModule {}
