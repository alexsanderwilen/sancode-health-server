import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { Filter } from 'src/utils/filter.utils'; 
import { CepsService } from './ceps.service';

@Controller('ceps')
export class CepsController {
    constructor(private readonly cepsService: CepsService) {}

    @Post('search')
    async findAll(
        @Body('filterExtra') filterExtra: Filter[] = [],
    ) {
        return this.cepsService.findAll(filterExtra);
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return this.cepsService.FindOne(+id);
    }

    @Get('cep/:cep')
    async findByCep(@Param('cep') cep: string) {
        return this.cepsService.findByCep(cep);
    }

    @Post()
    async create(@Body() createCepDto: { cep: string; logradouro: string; faixa_cep: string; bairro: string; cidade_id: number; estado_id: number }) {
        return this.cepsService.create(createCepDto);
    }

    @Patch(':id')
    async update(
      @Param('id') id: string,
      @Body() updateCepDto: Partial<{ cep: string; logradouro: string; faixa_cep: string; bairro: string; cidade_id: number; estado_id: number }>
    ) {
      return this.cepsService.update(+id, updateCepDto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string) {
        return this.cepsService.delete(+id);
    }
}
