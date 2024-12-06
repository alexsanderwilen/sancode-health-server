import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common'; 
import { MunicipiosService } from './municipios.service';
import { Filter } from 'src/utils/filter.utils';

@Controller('municipios')
export class MunicipiosController {
    constructor(private readonly municipiosService: MunicipiosService) {}

    @Post('search')
    async findAll(
        @Body('filterExtra') filterExtra: Filter[] = [],
    ) {
        return this.municipiosService.findAll(filterExtra);
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.municipiosService.FindOne(+id);
    }

    @Get('uf/:uf')
    async findByUF(@Param('uf') uf: string) {
        return this.municipiosService.findByUf(uf);
    }
    
    @Post()
    async create(@Body() createMunicipioDto: { codigo: number; cidade: string; uf: string; estadoId: number }) {
        return this.municipiosService.create(createMunicipioDto);
    }

    @Patch(':id')
    async update(
      @Param('id') id: string,
      @Body() updateMunicipioDto: Partial<{ codigo: number; cidade: string; uf: string; estadoId: number }>
    ) {
      return this.municipiosService.update(+id, updateMunicipioDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return this.municipiosService.delete(+id);
    }
}
