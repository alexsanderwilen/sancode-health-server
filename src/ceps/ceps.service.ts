import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { buildWhereCondition, Filter } from '../utils/filter.utils';

@Injectable()
export class CepsService {
    constructor(private prisma: PrismaService) {}

    async findAll(filtroExtra: Filter[]) {
        try {
            const where = buildWhereCondition(filtroExtra);
            const [data] = await Promise.all([
                this.prisma.tb_cep.findMany({
                    orderBy: { cep: 'asc' },
                    where
                })
            ]);

            return {
                data,
            };
        } catch (error) {
            console.error('Erro ao buscar ceps:', error);
            throw error;
        }
    }

    async FindOne(id: number) {
        return this.prisma.tb_cep.findUnique({ where: { id } });
    }

    async findByCep(cep: string) {
        return this.prisma.tb_cep.findMany({ where: { cep } });
    }

    async create(data: { cep: string; logradouro: string; faixa_cep: string; bairro: string; cidade_id: number; estado_id: number }) {
        return this.prisma.tb_cep.create({ data });
    }

    async update(id: number, updateData: Partial<{ cep: string; logradouro: string; faixa_cep: string; bairro: string; cidade_id: number; estado_id: number }>) {
        return this.prisma.tb_cep.update({
            where: { id },
            data: updateData
        });
    }

    async delete(id: number) {
        return this.prisma.tb_cep.delete({ where: { id } });
    }
}
