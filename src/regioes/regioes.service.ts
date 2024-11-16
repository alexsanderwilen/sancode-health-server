import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class RegioesService {
    constructor(private prisma: PrismaService) { }

    async findAll() {         
        return this.prisma.tb_regiao.findMany();
    } 
    
    async create( data: { regiao: string; }) { 
        return this.prisma.tb_regiao.create({ data }); 
    }

    async FindOne(id: number) {
        return this.prisma.tb_regiao.findUnique({ where: { id } });
    }
    
    async FindOneByNome(regiao: string) {
        return this.prisma.tb_regiao.findUnique({ where: { regiao } });
    }

    async update(id: number, data: { regiao: string; }) {
        return this.prisma.tb_regiao.update({ where: { id }, data });
    }

    async delete(id: number) {
        return this.prisma.tb_regiao.delete({ where: { id } });
    }   
}
