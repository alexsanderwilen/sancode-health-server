import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { buildWhereCondition, Filter } from '../utils/filter.utils';

@Injectable()
export class MunicipiosService {
    constructor(private prisma: PrismaService) {}

    async findAll(filtroExtra: Filter[]) {
        try {
            const where = buildWhereCondition(filtroExtra);
            const [data] = await Promise.all([
                this.prisma.tb_municipio.findMany({
                    orderBy: { cidade: 'asc' },
                    where
                })
            ]);

            return {
                data,
            };
        } catch (error) {
            console.error('Erro ao buscar municípios:', error);
            throw error;
        }
    }

    async FindOne(id: number) {
        return this.prisma.tb_municipio.findUnique({ where: { id } });
    }

    async findByUf(uf: string) {
        return this.prisma.tb_municipio.findMany({ where: { uf } });
    }

    async create(data: { codigo: number; cidade: string; uf: string; estado_id: number }) {
        return this.prisma.tb_municipio.create({ data });
    }

    async update(id: number, updateData: Partial<{ codigo: number; cidade: string; uf: string; estado_id: number }>) {
        return this.prisma.tb_municipio.update({
            where: { id },
            data: updateData
        });
    }

    async delete(id: number) {
        return this.prisma.tb_municipio.delete({ where: { id } });
    }
}
