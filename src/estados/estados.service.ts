import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { buildWhereCondition, Filter } from '../utils/filter.utils';

@Injectable()
export class EstadosService {
    constructor(private prisma: PrismaService) {}

    async findAll(filtroExtra: Filter[]) {
        try {
            const where = buildWhereCondition(filtroExtra);
    
            const estados = await this.prisma.tb_estado.findMany({
                orderBy: { estado: 'asc' },
                where,
                include: {
                    tb_regiao: { select: { regiao: true } }, // Inclui somente o campo necessário
                    tb_pais: { select: { pais: true } },    // Inclui somente o campo necessário
                },
            });
    
            // Personaliza os aliases no retorno
            const data = estados.map((estado) => ({
                id: estado.id,
                codigoUf: estado.codigo_uf,
                estado: estado.estado,
                estadoOficial: estado.estado_oficial,
                uf: estado.uf,
                regiaoId: estado.regiao_id,
                regiao: estado.tb_regiao?.regiao,
                paisId: estado.pais_id,
                pais: estado.tb_pais?.pais,
            }));
    
            return { data };
        } catch (error) {
            console.error('Erro ao buscar estados:', error);
            throw error;
        }
    }

    async findOne(id: number) {
        const estado = await this.prisma.tb_estado.findUnique({
            where: { id },
            include: {
                tb_regiao: { select: { regiao: true } },
                tb_pais: { select: { pais: true } },
            },
        });
    
        if (!estado) {
            throw new Error(`Estado com ID ${id} não encontrado.`);
        }
    
        return {
            id: estado.id,
            codigoUf: estado.codigo_uf,
            estado: estado.estado,
            estadoOficial: estado.estado_oficial,
            uf: estado.uf,
            regiaoId: estado.regiao_id,
            regiao: estado.tb_regiao?.regiao,
            paisId: estado.pais_id,
            pais: estado.tb_pais?.pais,
        };
    }

    async findOneUf(uf: string) {
        const ufUpperCase = uf.toUpperCase();
    
        const estado = await this.prisma.tb_estado.findUnique({
            where: { uf: ufUpperCase },
            include: {
                tb_regiao: { select: { regiao: true } }, // Inclui a descrição da região
                tb_pais: { select: { pais: true } },    // Inclui a descrição do país
            },
        });
    
        if (!estado) {
            throw new Error(`Estado com UF ${uf} não encontrado.`);
        }
            
        return {
            id: estado.id,
            codigoUf: estado.codigo_uf,
            estado: estado.estado,
            estadoOficial: estado.estado_oficial,
            uf: estado.uf,
            regiaoId: estado.regiao_id,
            regiao: estado.tb_regiao?.regiao,
            paisId: estado.pais_id,
            pais: estado.tb_pais?.pais,
        };
    }
      

    async create(data: { codigo_uf: number; estado: string; estado_oficial: string; uf: string; regiao_id: number; pais_id: number }) {
        // Valida se o regiao_id existe
        const regiao = await this.prisma.tb_regiao.findUnique({ where: { id: data.regiao_id } });
        if (!regiao) {
            throw new Error(`Região com ID ${data.regiao_id} não encontrada.`);
        }
    
        // Valida se o pais_id existe
        const pais = await this.prisma.tb_pais.findUnique({ where: { id: data.pais_id } });
        if (!pais) {
            throw new Error(`País com ID ${data.pais_id} não encontrado.`);
        }
    
        // Cria o estado
        const estado = await this.prisma.tb_estado.create({
            data,
            include: {
                tb_regiao: { select: { regiao: true } },
                tb_pais: { select: { pais: true } },
            },
        });
                       
        return {
            id: estado.id,
            codigoUf: estado.codigo_uf,
            estado: estado.estado,
            estadoOficial: estado.estado_oficial,
            uf: estado.uf,
            regiaoId: estado.regiao_id,
            regiao: estado.tb_regiao?.regiao,
            paisId: estado.pais_id,
            pais: estado.tb_pais?.pais,
        };
    }
    

    async update(id: number, updateData: Partial<{ codigo_uf: number; estado: string; estado_oficial: string; uf: string; regiao_id: number; pais_id: number }>) {
        // Verifica se regiao_id está no updateData e valida se existe
        if (updateData.regiao_id) {
            const regiao = await this.prisma.tb_regiao.findUnique({ where: { id: updateData.regiao_id } });
            if (!regiao) {
                throw new Error(`Região com ID ${updateData.regiao_id} não encontrada.`);
            }
        }
    
        // Verifica se pais_id está no updateData e valida se existe
        if (updateData.pais_id) {
            const pais = await this.prisma.tb_pais.findUnique({ where: { id: updateData.pais_id } });
            if (!pais) {
                throw new Error(`País com ID ${updateData.pais_id} não encontrado.`);
            }
        }
    
        // Atualiza o estado
        return this.prisma.tb_estado.update({
            where: { id },
            data: updateData,
        });
    }

    async delete(id: number) {
        return this.prisma.tb_estado.delete({ where: { id } });
    }
}
