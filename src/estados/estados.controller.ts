import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common'; 
import { Filter } from 'src/utils/filter.utils';
import { EstadosService } from './estados.service';
import { clear } from 'console';

@Controller('estados')
export class EstadosController {
    constructor(private readonly estadosService: EstadosService) {}

    @Post('search')
    async findAll(
        @Body('filterExtra') filterExtra: Filter[] = [],
    ) {        
        return this.estadosService.findAll(filterExtra);
    }

    @Get(':id') 
    async findOne(@Param('id') id: string) { 
        return this.estadosService.findOne(+id);
    }
    
    @Get('uf/:uf')
    async findOneUf(@Param('uf') uf: string) {
        return this.estadosService.findOneUf(uf);
    }

    @Post()
    async create(@Body() createEstadoDto: { codigoUf: number; estado: string; estadoOficial: string; uf: string; regiaoId: number; paisId: number }) { 
        return this.estadosService.create(createEstadoDto); 
    }

    @Patch(':id')
    async update(
      @Param('id') id: string,
      @Body() updateEstadoDto: Partial<{ estado: string; sigla: string; codigo: number; pais: number }>
    ) { 
      return this.estadosService.update(+id, updateEstadoDto);
    }

    @Delete(':id') async remove(@Param('id') id: string) {
        return this.estadosService.delete(+id);
    }
}
