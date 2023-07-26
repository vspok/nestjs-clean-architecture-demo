import { BadRequestException } from "@nestjs/common";
import { FiltroLimit } from "src/helpers/interfaces/filter-options";
import { IPaginator } from "src/helpers/interfaces/paginator-response-interface";
import { ISelectQueryBuilder } from "src/helpers/interfaces/select-query-builder-interface";

export const PaginateCreate = async <T = any>(
    queryBuilder: ISelectQueryBuilder<T>,
    pageFiltro: number,
    limitFiltro: FiltroLimit,
    type?,
): Promise<IPaginator<T>> => {
    try {
        if (limitFiltro == 'todos' || limitFiltro == 'all') {
            limitFiltro = 0;
        }

        let [items, totalItems] = await queryBuilder
            .take(limitFiltro)
            .skip((pageFiltro - 1) * limitFiltro)
            .getManyAndCount()
            .catch((error) => {
                console.error(error);
                throw new BadRequestException(error);
            });
        const pagina: IPaginator = {
            items: items,
            meta: {
                totalItems: +totalItems,
                currentPage: +pageFiltro,
                itemsPerPage: limitFiltro == 0 ? totalItems : +limitFiltro,
                itemCount: items.length,
                totalPage:
                    limitFiltro == 0
                        ? 1
                        : Number.isInteger(totalItems / limitFiltro)
                        ? totalItems / limitFiltro
                        : Math.trunc(totalItems / limitFiltro) + 1,
            },
        };
        return pagina;
    } catch (error) {
        console.error(error);
        throw new BadRequestException(error);
    }
};
