import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository } from 'typeorm';
import { IPaginator } from 'src/helpers/interfaces/paginator-response-interface';
import { FiltroLimit } from 'src/helpers/interfaces/filter-options';
import { snakeCase } from 'typeorm/util/StringUtils';
import { PaginateCreate } from 'src/infra/common/utils/paginate-create';
import { FilterFunction, IFunctionRepository } from 'src/domain/repositories/funtions-repository';
import { FunctionEntity } from '../entities/functions.entity';
import { FunctionModel } from 'src/domain/models/functions';

@Injectable()
export class FunctionRepository implements IFunctionRepository {
    constructor(
        @InjectRepository(FunctionEntity)
        private readonly functionEntityRepository: Repository<FunctionEntity>,
    ) {}
    async create(_function: FunctionModel): Promise<FunctionModel> {
        try {
            return await this.functionEntityRepository
                .save(_function)
                .then(async (functionSaved) => {
                    const functionUpdated = await this.findOne({ function_id: functionSaved.function_id });
                    return functionUpdated;
                })
                .catch((error) => {
                    throw new BadRequestException({
                        descricao: 'Erro ao Create Function! - 002',
                        ...error,
                    });
                });
        } catch (error) {
            throw new BadRequestException({
                descricao: 'Error Create Function! - 001',
                ...error,
            });
        }
    }
    async update(functionId: number, _function: Partial<FunctionModel>): Promise<FunctionModel> {
        try {
            return await this.functionEntityRepository
                .save({ functionId, ..._function })
                .then(async (functionSaved) => {
                    const functionUpdated = await this.findOne({ function_id: functionSaved.function_id });
                    return functionUpdated;
                })
                .catch((error) => {
                    throw new BadRequestException({
                        descricao: 'Error Update Function! - 002',
                        ...error,
                    });
                });
        } catch (error) {
            throw new BadRequestException({
                descricao: 'Error Create Function! - 001',
                ...error,
            });
        }
    }
    delete(functionId: number): Promise<void> {
        throw new Error('Method not implemented.');
    }
    async findOne(filter: Partial<FunctionModel>): Promise<FunctionModel> {
        return await this.functionEntityRepository.findOneBy(filter);
    }
    findMany(filter: FilterFunction): Promise<IPaginator<FunctionModel>> {
        try {
            let queryBuilder = this.functionEntityRepository.createQueryBuilder('_function');
            let pageFiltro = 1,
                limitFiltro: FiltroLimit = 10;
            if (filter) {
                const { direction, sort, page, limit, text, ...where } = filter;
                if (where) {
                    queryBuilder = queryBuilder.andWhere(where);
                }
                if (page) {
                    pageFiltro = page;
                }
                if (limit) {
                    limitFiltro = limit;
                }
                if (sort && direction) {
                    queryBuilder = queryBuilder.addOrderBy(snakeCase(sort.replace(/\./g, '_')), direction);
                }
                if (text) {
                    queryBuilder = queryBuilder.andWhere(
                        new Brackets((qb) => {
                            qb.orWhere('_function.function_id LIKE :function_id_text', {
                                function_id_text: '%' + text + '%',
                            });
                        }),
                    );
                }
            }
            return PaginateCreate<FunctionEntity>(queryBuilder, pageFiltro, limitFiltro);
        } catch (error) {
            console.error(error);
            throw new BadRequestException({
                descricao: 'Error findMany _function! - 001',
                ...error,
            });
        }
    }
    findAll(): Promise<FunctionModel[]> {
        let queryBuilder = this.functionEntityRepository.createQueryBuilder('_function');

        return queryBuilder.getMany();
    }
}
