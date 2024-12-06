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
                    tb_estado: { select: { estado: true, uf: true } },
                },
            });
                
            const data = municipios.map((municipio) => ({
                id: municipio.id,
                codigo: municipio.codigo,
                cidade: municipio.cidade,
                estadoId: municipio.estado_id,
                estado: municipio.tb_estado?.estado,
                uf: municipio.tb_estado?.uf,
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
                tb_estado: { select: { estado: true, uf: true } },                
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
            uf: municipio.tb_estado?.uf,
        };
    }

    async findByUf(uf: string) {
        const ufUpperCase = uf.toUpperCase();
    
        const municipios = await this.prisma.tb_municipio.findMany({
            where: { uf: ufUpperCase },
            include: {
                tb_estado: { select: { estado: true, uf: true } },
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
                uf: municipio.tb_estado?.uf,
            };    
        });
    }

    async create(data: { codigo: number; cidade: string; uf: string; estadoId: number }) {
        
        const estado = await this.prisma.tb_estado.findUnique({ where: { id: data.estadoId } });
        if (!estado) {
            throw new Error(`Estado com ID ${data.estadoId} não encontrado.`);
        }
                
        const municipio = await this.prisma.tb_municipio.create({
            data:{
                codigo: data.codigo,
                cidade: data.cidade,
                uf: data.uf,
                estado_id: data.estadoId,
            },
            select: {
                id: true,
                codigo: true,
                cidade: true,
                estado_id: true,
                tb_estado: { 
                    select: { 
                        estado: true, 
                        uf: true 
                    } 
                },
            },
        });     
        
        return {
            id: municipio.id,
            cidade: municipio.cidade,
            codigo: municipio.codigo,
            estadoID: municipio.estado_id,
            estado: municipio.tb_estado?.estado,
            uf: municipio.tb_estado?.uf,
        };      
    }

    async update(id: number, updateData: Partial<{ codigo: number; cidade: string; uf: string; estadoId: number }>) {
        try {
            const {estadoId, ...fieldsToUpdate} = updateData;

            const validations = await Promise.all([
                estadoId ? this.prisma.tb_estado.findUnique({ where: { id: estadoId } }) : Promise.resolve(null),
            ]);

            if (estadoId && !validations[0]) {
                throw new Error(`Estado com ID ${estadoId} não encontrado.`);
            }
            
            const updateFields = {} as any;
            if (updateData.codigo !== undefined) updateFields.codigo = updateData.codigo;
            if (updateData.cidade !== undefined) updateFields.cidade = updateData.cidade;
            if (updateData.uf !== undefined) updateFields.uf = updateData.uf;
            if (updateData.estadoId !== undefined) updateFields.estado_id = updateData.estadoId;

            const municipio = await this.prisma.tb_municipio.update({
                where: { id },
                data: updateFields,
                select: {
                    id: true,
                    codigo: true,
                    cidade: true,
                    estado_id: true,
                    tb_estado: { 
                        select: { 
                            estado: true, 
                            uf: true 
                        } 
                    },
                },
            });

            return {
                id: municipio.id,
                cidade: municipio.cidade,
                codigo: municipio.codigo,
                estadoID: municipio.estado_id,
                estado: municipio.tb_estado?.estado,
                uf: municipio.tb_estado?.uf,
            };

        } catch (error) {
            console.error('Erro ao atualizar município:', error);
            throw new Error('Erro interno do servidor');
        }
    }

    async delete(id: number) {
        return this.prisma.tb_municipio.delete({ where: { id } });
    }
}
