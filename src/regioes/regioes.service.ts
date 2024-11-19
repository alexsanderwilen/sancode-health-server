import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { buildWhereCondition, Filter } from '../utils/filter.utils';

@Injectable()
export class RegioesService {
    constructor(private prisma: PrismaService) { }

    async findAll(filtroExtra: Filter[]) {
        try {
            const where = buildWhereCondition(filtroExtra);
            const [data] = await Promise.all([
                this.prisma.tb_regiao.findMany({
                    orderBy: { regiao: 'asc' },
                    where
                })
            ]);

            return {
                data,
            };
        } catch (error) {
            console.error('Erro ao buscar regiões:', error);
            throw error;
        }
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
