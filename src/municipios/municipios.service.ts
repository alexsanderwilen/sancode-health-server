import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { buildWhereCondition, Filter } from '../utils/filter.utils';

@Injectable()
export class MunicipiosService {
    constructor(private prisma: PrismaService) {}

    async findAll(filtroExtra: Filter[]) {
        try {
            const where = buildWhereCondition(filtroExtra);
    
            const municipios = await this.prisma.tb_municipio.findMany({
                orderBy: { cidade: 'asc' },
                where,
                include: {
                    tb_estado: { select: { estado: true } }, // Inclui somente o campo necessário                    
                },
            });
                
            const data = municipios.map((municipio) => ({
                id: municipio.id,
                codigo: municipio.codigo,
                cidade: municipio.cidade,
                estadoId: municipio.estado_id,
                estado: municipio.tb_estado?.estado,
                uf: municipio.uf,                
            }));
    
            return { data };
        } catch (error) {
            console.error('Erro ao buscar estados:', error);
            throw error;
        }
    }

    async FindOne(id: number) {
        const municipio = await this.prisma.tb_municipio.findUnique({
            where: { id },
            include: {
                tb_estado: { select: { estado: true } },                
            },
        });
    
        if (!municipio) {
            throw new Error(`Município com ID ${id} não encontrado.`);
        }
    
        return {
            id: municipio.id,
            codigo: municipio.codigo,            
            cidade: municipio.cidade,
            estadoId: municipio.estado_id,
            estado: municipio.tb_estado?.estado,
            uf: municipio.uf,
        };
    }

    async findByUf(uf: string) {
        const ufUpperCase = uf.toUpperCase();
    
        const municipios = await this.prisma.tb_municipio.findMany({
            where: { uf: ufUpperCase },
            include: {
                tb_estado: { select: { estado: true } },                 
            },
        });
    
        if (!municipios) {
            throw new Error(`Município com UF ${uf} não encontrado.`);
        }

        return municipios.map((municipio) => {
            return {
                id: municipio.id,
                cidade: municipio.cidade,
                codigo: municipio.codigo,
                estadoID: municipio.estado_id,
                estado: municipio.tb_estado?.estado,
                uf: municipio.uf,
            };    
        });
    }

    async create(data: { codigo: number; cidade: string; uf: string; estado_id: number }) {
        
        const estado = await this.prisma.tb_estado.findUnique({ where: { id: data.estado_id } });
        if (!estado) {
            throw new Error(`Estado com ID ${data.estado_id} não encontrado.`);
        }
                
        return this.prisma.tb_municipio.create({
            data,
        });        
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
