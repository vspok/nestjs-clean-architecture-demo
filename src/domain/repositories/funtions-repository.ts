import { IFilterOptions } from 'src/helpers/interfaces/filter-options';
import { FunctionModel } from '../models/functions';
import { IPaginator } from 'src/helpers/interfaces/paginator-response-interface';

export interface FilterFunction extends IFilterOptions<Partial<FunctionModel>, {}> {}

export abstract class IFunctionRepository {
    abstract create(_function: FunctionModel): Promise<FunctionModel>;
    abstract update(functionId: number, _function: Partial<FunctionModel>): Promise<FunctionModel>;
    abstract delete(functionId: number): Promise<void>;
    abstract findOne(filter: Partial<FunctionModel>): Promise<FunctionModel | null>;
    abstract findMany(filter: FilterFunction): Promise<IPaginator<FunctionModel> | null>;
    abstract findAll(): Promise<FunctionModel[] | null>;
}
