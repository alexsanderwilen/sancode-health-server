import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common'; 
import { RegioesService } from './regioes.service';

@Controller('regioes')
export class RegioesController {
    constructor(private readonly regioesService: RegioesService) {}  
    
    @Get() async findAll() { 
        return this.regioesService.findAll();    
    }    
    
    @Get(':id') async findOne(@Param('id') id: string) { 
        return this.regioesService.FindOne(+id);
    }

    @Post() async create(@Body() createRegiaoDto: { regiao: string }) { 
        return this.regioesService.create(createRegiaoDto); 
    }    

    @Patch(':id') async update(@Param('id') id: string, @Body() updateRegiaoDto: { regiao: string }) { 
        return this.regioesService.update(+id, updateRegiaoDto); 
    }

    @Delete(':id') async remove(@Param('id') id: string) {
        return this.regioesService.delete(+id);
    }
}