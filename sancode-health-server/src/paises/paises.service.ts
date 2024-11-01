import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PaisesService {
    constructor(private prisma: PrismaService) { }

    async findAll() {         
        return this.prisma.tb_pais.findMany({
            orderBy: {
                pais: 'asc'
            }
        });
    } 

    async FindOne(id: number) {
        return this.prisma.tb_pais.findUnique({ where: { id } });
    }
    
    async create( data: { pais: string; sigla: string; codigo: number, continente: string }) { 
        return this.prisma.tb_pais.create({ data }); 
    }

    async update(id: number, updateData: Partial<{ pais: string; sigla: string; codigo: number; continente: string }>) {        
        return this.prisma.tb_pais.update({
          where: { id },
          data: updateData
        });
    }

    async delete(id: number) {
        return this.prisma.tb_pais.delete({ where: { id } });
    }
}
