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
            case 'começa com':
                condition = { [campo]: { startsWith: valor, mode: 'insensitive' } };
                break;
                case 'termina com':
                    condition = { [campo]: { endWith: valor, mode: 'insensitive' } };
                    break;
            case 'igual':
                // Caso seja igual, deve comparar o tipo do campo
                if (tipo === 'number') {
                    condition = { [campo]: { equals: parseFloat(valor) } };
                } else {
                    condition = { [campo]: { equals: valor, mode: 'insensitive'} };
                }
                break;
            case 'contém':  // Adicionando a condição "contém"
                condition = { [campo]: { contains: valor, mode: 'insensitive' } };
                break;
            case 'maior':
                condition = { [campo]: { gt: parseFloat(valor) } };
                break;
            case 'menor':
                condition = { [campo]: { lt: parseFloat(valor) } };
                break;
            case 'entre':
                condition = { [campo]: { gte: parseFloat(valorInicial), lte: parseFloat(valorFinal) } };
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
