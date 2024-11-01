import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common'; 
import { PaisesService } from './paises.service';
import { Console, log } from 'console';

@Controller('paises')
export class PaisesController {
    constructor(private readonly paisesService: PaisesService) {}  
    
    @Get() async findAll() { 
        return this.paisesService.findAll();    
    }    
    
    @Get(':id') async findOne(@Param('id') id: string) { 
        return this.paisesService.FindOne(+id);
    }

    @Post() async create(@Body() createPaisDto: { pais: string; sigla: string; codigo: number, continente: string }) { 
        log(createPaisDto);        
        return this.paisesService.create(createPaisDto); 
    }    

    @Patch(':id')
    async update(
      @Param('id') id: string,
      @Body() updatePaisDto: Partial<{ pais: string; sigla: string; codigo: number; continente: string }>
    ) { 
      return this.paisesService.update(+id, updatePaisDto);
    }

    @Delete(':id') async remove(@Param('id') id: string) {
        return this.paisesService.delete(+id);
    }
}
