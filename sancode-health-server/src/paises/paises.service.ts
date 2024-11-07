import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { buildWhereCondition, Filter } from 'src/utils/filter.utils';

@Injectable()
export class PaisesService {
    constructor(private prisma: PrismaService) { }

    async findAll(filtroExtra: Filter[]) {
        try {
            const where = buildWhereCondition(filtroExtra);
            const [data] = await Promise.all([
                this.prisma.tb_pais.findMany({
                    orderBy: { pais: 'asc' },
                    where
                })
            ]);
    

            return {
                data,
            };
        } catch (error) {
            console.error('Erro ao buscar países:', error);
            throw error;
        }
    }

    async FindOne(id: number) {
        return this.prisma.tb_pais.findUnique({ where: { id } });
    }
    
    async create(data: { pais: string; sigla: string; codigo: number, continente: string }) { 
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
