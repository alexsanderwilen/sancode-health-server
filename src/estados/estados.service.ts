import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { buildWhereCondition, Filter } from '../utils/filter.utils';

@Injectable()
export class EstadosService {
    constructor(private prisma: PrismaService) { }

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
                tb_regiao: { select: { regiao: true } },
                tb_pais: { select: { pais: true } },
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


    async create(data: { codigoUf: number; estado: string; estadoOficial: string; uf: string; regiaoId: number; paisId: number }) {
        const estado = await this.prisma.tb_estado.create({
          data: {
            codigo_uf: data.codigoUf,
            estado: data.estado,
            estado_oficial: data.estadoOficial,
            uf: data.uf,
            regiao_id: data.regiaoId,
            pais_id: data.paisId,
          },
          select: {
            id: true,
            codigo_uf: true,
            estado: true,
            estado_oficial: true,
            uf: true,
            regiao_id: true,
            pais_id: true,
            tb_regiao: {
              select: { regiao: true },
            },
            tb_pais: {
              select: { pais: true },
            },
          },
        });
              
        return {
          id: estado.id,
          codigo_uf: estado.codigo_uf,
          estado: estado.estado,
          estado_oficial: estado.estado_oficial,
          uf: estado.uf,
          regiao_id: estado.regiao_id,
          regiao: estado.tb_regiao.regiao, 
          pais_id: estado.pais_id,
          pais: estado.tb_pais.pais, 
        };
      }

      async update(
        id: number,
        updateData: Partial<{ codigoUf: number; estado: string; estadoOficial: string; uf: string; regiaoId: number; paisId: number }>
      ) {
        try {
          const { regiaoId, paisId, ...fieldsToUpdate } = updateData;

          const validations = await Promise.all([
            regiaoId ? this.prisma.tb_regiao.findUnique({ where: { id: regiaoId } }) : null,
            paisId ? this.prisma.tb_pais.findUnique({ where: { id: paisId } }) : null
          ]);
      
          if (regiaoId && !validations[0]) {
            throw new Error(`Região com ID ${regiaoId} não encontrada.`);
          }
      
          if (paisId && !validations[1]) {
            throw new Error(`País com ID ${paisId} não encontrado.`);
          }          
      
          const updateFields = {} as any;
          if (updateData.codigoUf !== undefined) updateFields.codigo_uf = updateData.codigoUf;
          if (updateData.estado !== undefined) updateFields.estado = updateData.estado;
          if (updateData.estadoOficial !== undefined) updateFields.estado_oficial = updateData.estadoOficial;
          if (updateData.uf !== undefined) updateFields.uf = updateData.uf;
          if (updateData.regiaoId !== undefined) updateFields.regiao_id = updateData.regiaoId;
          if (updateData.paisId !== undefined) updateFields.pais_id = updateData.paisId;
      
          const updatedEstado = await this.prisma.tb_estado.update({
            where: { id },
            data: updateFields,
            select: {
              id: true,
              codigo_uf: true,
              estado: true,
              estado_oficial: true,
              uf: true,
              regiao_id: true,
              pais_id: true,
              tb_regiao: {
                select: { regiao: true },
              },
              tb_pais: {
                select: { pais: true },
              },
            },
          });
      
          return {
            id: updatedEstado.id,
            codigo_uf: updatedEstado.codigo_uf,
            estado: updatedEstado.estado,
            estado_oficial: updatedEstado.estado_oficial,
            uf: updatedEstado.uf,
            regiao_id: updatedEstado.regiao_id,
            regiao: updatedEstado.tb_regiao?.regiao,
            pais_id: updatedEstado.pais_id,
            pais: updatedEstado.tb_pais?.pais,
          };
        } catch (error) {
          console.error('Erro ao atualizar estado:', error);
          throw new Error('Erro interno do servidor');
        }
      }
   
    async delete(id: number) {
        return this.prisma.tb_estado.delete({ where: { id } });
    }
}
