import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PaisesModule } from './paises/paises.module';
import { RegioesModule } from './regioes/regioes.module';
import { EstadosModule } from './estados/estados.module';
import { MunicipiosModule } from './municipios/municipios.module';
import { BairrosModule } from './bairros/bairros.module';
import { CepsModule } from './ceps/ceps.module';

@Module({
  imports: [AuthModule, PaisesModule, RegioesModule, EstadosModule, MunicipiosModule, BairrosModule, CepsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
