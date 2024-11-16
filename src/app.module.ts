import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PaisesModule } from './paises/paises.module';
import { RegioesModule } from './regioes/regioes.module';

@Module({
  imports: [AuthModule, PaisesModule, RegioesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
