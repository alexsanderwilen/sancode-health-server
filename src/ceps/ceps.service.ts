import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { buildWhereCondition, Filter } from '../utils/filter.utils';
import { BairrosController } from 'src/bairros/bairros.controller';

@Injectable()
export class CepsService {
    constructor(private prisma: PrismaService) {}

    async findAll(filtroExtra: Filter[]) {
        try {
            const where = buildWhereCondition(filtroExtra);
    
            const ceps = await this.prisma.tb_cep.findMany({
                orderBy: { logradouro: 'asc' },
                where,
                include: {
                    tb_municipio: { select: { cidade: true } },
                    tb_estado: { select: { estado: true, uf: true } },
                },
            });
                
            const data = ceps.map((cep) => ({
                id: cep.id,
                cep: cep.cep,
                logradouro: cep.logradouro,
                faixaCep: cep.faixa_cep,
                bairro: cep.bairro,
                cidadeId: cep.cidade_id,
                cidade: cep.tb_municipio?.cidade,
                estadoId: cep.estado_id,
                estado: cep.tb_estado?.estado,
                uf: cep.tb_estado?.uf,
            }));
    
            return { data };
        } catch (error) {
            console.error('Erro ao buscar os CEPs:', error);
            throw error;
        }
    }

    async FindOne(id: number) {
        const cep = await this.prisma.tb_cep.findUnique({
            where: { id },
            include: {
                tb_municipio: { select: { cidade: true } },
                tb_estado: { select: { estado: true, uf: true } },             
            },
        });
    
        if (!cep) {
            throw new Error(`CEP com ID ${id} não encontrado.`);
        }
    
        return {
            id: cep.id,
            cep: cep.cep,
            logradouro: cep.logradouro,
            faixaCep: cep.faixa_cep,
            bairro: cep.bairro,
            cidadeId: cep.cidade_id,
            cidade: cep.tb_municipio?.cidade,
            estadoId: cep.estado_id,
            estado: cep.tb_estado?.estado,
            uf: cep.tb_estado?.uf,
        };
    }
    

    async findByCep(cep: string) {
        try {    
            const ceps = await this.prisma.tb_cep.findMany({
                orderBy: { logradouro: 'asc' },
                where: { cep },
                include: {
                    tb_municipio: { select: { cidade: true } },
                    tb_estado: { select: { estado: true, uf: true } },
                },
            });
                
            const data = ceps.map((cep) => ({
                id: cep.id,
                cep: cep.cep,
                logradouro: cep.logradouro,
                faixaCep: cep.faixa_cep,
                bairro: cep.bairro,
                cidadeId: cep.cidade_id,
                cidade: cep.tb_municipio?.cidade,
                estadoId: cep.estado_id,
                estado: cep.tb_estado?.estado,
                uf: cep.tb_estado?.uf,
            }));
    
            return { data };
        } catch (error) {
            console.error('Erro ao buscar os CEPs:', error);
            throw error;
        }
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
