import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common'; 
import { Filter } from 'src/utils/filter.utils';
import { EstadosService } from './estados.service';

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
        return this.estadosService.FindOne(+id);
    }
    
    @Get('uf/:uf')
    async findOneUf(@Param('uf') uf: string) {
        return this.estadosService.findOneUf(uf);
    }

    @Post()
    async create(@Body() createEstadoDto: { codigo_uf: number; estado: string; estado_oficial: string; uf: string; regiao_id: number; pais_id: number }) { 
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
