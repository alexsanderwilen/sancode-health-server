import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { buildWhereCondition, Filter } from '../utils/filter.utils';

@Injectable()
export class EstadosService {
    constructor(private prisma: PrismaService) {}

    async findAll(filtroExtra: Filter[]) {
        try {
            const where = buildWhereCondition(filtroExtra);
            const [data] = await Promise.all([
                this.prisma.tb_estado.findMany({
                    orderBy: { estado: 'asc' },
                    where
                })
            ]);

            return {
                data,
            };
        } catch (error) {
            console.error('Erro ao buscar estados:', error);
            throw error;
        }
    }

    async FindOne(id: number) {
        return this.prisma.tb_estado.findUnique({ where: { id } });
    }

    async findOneUf(uf: string) {
        const ufUpperCase = uf.toUpperCase();
        return this.prisma.tb_estado.findUnique({ where: { uf: ufUpperCase } });
      }
      

    async create(data: { codigo_uf: number; estado: string; estado_oficial: string; uf: string; regiao_id: number; pais_id: number }) {
        return this.prisma.tb_estado.create({
          data,
        });
    }

    async update(id: number, updateData: Partial<{ codigo_uf: number; estado: string; estado_oficial: string; uf: string; regiao_id: number; pais_id: number }>) {
        return this.prisma.tb_estado.update({
          where: { id },
          data: updateData
        });
    }

    async delete(id: number) {
        return this.prisma.tb_estado.delete({ where: { id } });
    }
}
