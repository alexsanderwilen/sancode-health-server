import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common'; 
import { Filter } from 'src/utils/filter.utils';
import { BairrosService } from './bairros.service';

@Controller('bairros')
export class BairrosController {
    constructor(private readonly bairrosService: BairrosService) {}
    
    @Post('search')
    async findAll(
        @Body('filterExtra') filterExtra: Filter[] = [],
    ) {        
        return this.bairrosService.findAll(filterExtra);
    } 

    @Get(':id') 
    async findOne(@Param('id') id: string) { 
        return this.bairrosService.FindOne(+id);
    }

    @Post() 
    async create(@Body() createBairroDto: { codigo: number; bairro: string; cidade_id: number; uf: string}) {         
        return this.bairrosService.create(createBairroDto); 
    }    

    @Patch(':id')
    async update(
      @Param('id') id: string,
      @Body() updateBairroDto: Partial<{ codigo: number; bairro: string; cidade_id: number; uf: string }>
    ) { 
      return this.bairrosService.update(+id, updateBairroDto);
    }

    @Delete(':id') 
    async remove(@Param('id') id: string) {
        return this.bairrosService.delete(+id);
    }
}
