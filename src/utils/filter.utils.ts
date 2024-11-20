import { endWith } from "rxjs";

export interface Filter {
    campo: string;
    tipo: string;
    condicao: string;
    valor?: any;
    valorInicial?: any;
    valorFinal?: any;
}

export function buildWhereCondition(filters: Filter[], operador: 'AND' | 'OR' = 'AND') {
    const where = operador === 'AND' ? { AND: [] } : { OR: [] };

    filters.forEach(filter => {
        const { campo, tipo, condicao, valor, valorInicial, valorFinal } = filter;
        let condition = {};

        // Converte o valor para o tipo correto, dependendo do campo
        if (tipo === 'number') {
            if (valor) {
                filter.valor = parseFloat(valor);
            }
            if (valorInicial) {
                filter.valorInicial = parseFloat(valorInicial);
            }
            if (valorFinal) {
                filter.valorFinal = parseFloat(valorFinal);
            }
        }

        switch (condicao) {
            case 'Igual':
              // Caso seja igual, deve comparar o tipo do campo
              if (tipo === 'number') {
                  condition = { [campo]: { equals: parseFloat(valor) } };
              } else {
                  condition = { [campo]: { equals: valor, mode: 'insensitive'} };
              }
              break;
            case 'Diferente':
                if (tipo === 'number') {
                    condition = { [campo]: {  not: {equals: parseFloat(valor) } } };
                } else {   
                    condition = { [campo]: { not: { equals: valor } } };
                }
                break
            case 'Contém':  // Adicionando a condição "contém"
                condition = { [campo]: { contains: valor, mode: 'insensitive' } };
                break;  
            case 'Começa com':
                condition = { [campo]: { startsWith: valor, mode: 'insensitive' } };
                break;
            case 'Termina com':
                condition = { [campo]: { endsWith: valor, mode: 'insensitive' } };
                break;
            case 'Maior':
                if (tipo === 'number') {
                    condition = { [campo]: { gt: parseFloat(valor) } };
                } else if (tipo === 'date') {
                    condition = { [campo]: { gt: new Date(valor) } };
                } else {  
                    condition = { [campo]: { gt: valor } };
                }    
                break;
            case 'Menor':
                if (tipo === 'number') {
                    condition = { [campo]: { lt: parseFloat(valor) } };
                } else if (tipo === 'date') {
                    condition = { [campo]: { lt: new Date(valor) } };
                } else {  
                    condition = { [campo]: { lt: valor } };
                }    
                break;
            case 'Igual ou maior':
              if (tipo === 'number') {
                condition = { [campo]: { gte: parseFloat(valor) } };
              } else if (tipo === 'date') {
                condition = { [campo]: { gte: new Date(valor) } };
              } else {
                condition = { [campo]: { gte: valor } };
              }
                break;
            case 'Igual ou menor':
              if (tipo === 'number') {
                condition = { [campo]: { lte: parseFloat(valor) } };
              } else if (tipo === 'date') {
                condition = { [campo]: { lte: new Date(valor) } };
              } else {
                condition = { [campo]: { lte: valor } };
              }
                break;
            case 'Entre':
                if (tipo === 'number') {
                    condition = { [campo]: { gte: parseFloat(valorInicial), lte: parseFloat(valorFinal) } };
                } else if (tipo === 'date') {
                    condition = { [campo]: { gte: new Date(valorInicial), lte: new Date(valorFinal) } };
                } else {
                    condition = { [campo]: { gte: valorInicial, lte: valorFinal } };
                }
                break;
            default:
                throw new Error(`Condição '${condicao}' não suportada.`);
        }

        if (operador === 'AND') {
            where.AND.push(condition);
        } else {
            where.OR.push(condition);
        }
    });

    return where;
}