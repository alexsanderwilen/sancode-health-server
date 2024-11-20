import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { buildWhereCondition, Filter } from '../utils/filter.utils';

@Injectable()
export class BairrosService {
    constructor(private prisma: PrismaService) {}

    async findAll(filtroExtra: Filter[]) {
        try {
            const where = buildWhereCondition(filtroExtra);
            const [data] = await Promise.all([
                this.prisma.tb_bairro.findMany({
                    orderBy: { bairro: 'asc' },
                    where
                })
            ]);

            return {
                data,
            };
        } catch (error) {
            console.error('Erro ao buscar bairros:', error);
            throw error;
        }
    }

    async FindOne(id: number) {
        return this.prisma.tb_bairro.findUnique({ where: { id } });
    }

    async findByMunicipio(cidade_id: number) {
        return this.prisma.tb_bairro.findMany({ where: { cidade_id } });
    }

    async create(data: {codigo: number; bairro: string; cidade_id: number; uf: string}) {
        return this.prisma.tb_bairro.create({ data });
    }

    async update(id: number, updateData: Partial<{codigo: number; bairro: string; cidade_id: number; uf: string}>) {
        return this.prisma.tb_bairro.update({
            where: { id },
            data: updateData
        });
    }   

    async delete(id: number) {
        return this.prisma.tb_bairro.delete({ where: { id } });
    }
}
