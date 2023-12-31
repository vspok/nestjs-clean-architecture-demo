import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { FilterUser, IUserRepository } from 'src/domain/repositories/user-repository';
import { UserModel } from 'src/domain/models/user';
import { IPaginator } from 'src/helpers/interfaces/paginator-response-interface';
import { FiltroLimit } from 'src/helpers/interfaces/filter-options';
import { snakeCase } from 'typeorm/util/StringUtils';
import { PaginateCreate } from 'src/infra/common/utils/paginate-create';

@Injectable()
export class UserRepository implements IUserRepository {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userEntityRepository: Repository<UserEntity>,
    ) {}
    async create(user: UserModel): Promise<UserModel> {
        try {
            return await this.userEntityRepository
                .save(user)
                .then(async (userSaved) => {
                    const userUpdated = await this.findOne({ user_id: userSaved.user_id });
                    return userUpdated;
                })
                .catch((error) => {
                    throw new BadRequestException({
                        descricao: 'Erro ao Create User! - 002',
                        ...error,
                    });
                });
        } catch (error) {
            throw new BadRequestException({
                descricao: 'Error Create User! - 001',
                ...error,
            });
        }
    }
    async update(userId: number, user: Partial<UserModel>): Promise<UserModel> {
        try {
            return await this.userEntityRepository
                .save({ userId, ...user })
                .then(async (userSaved) => {
                    const userUpdated = await this.findOne({ user_id: userSaved.user_id });
                    return userUpdated;
                })
                .catch((error) => {
                    throw new BadRequestException({
                        descricao: 'Error Update User! - 002',
                        ...error,
                    });
                });
        } catch (error) {
            throw new BadRequestException({
                descricao: 'Error Create User! - 001',
                ...error,
            });
        }
    }
    delete(userId: number): Promise<void> {
        throw new Error('Method not implemented.');
    }
    async findOne(filter: Partial<UserModel>): Promise<UserModel> {
        return await this.userEntityRepository.findOneBy(filter);
    }
    findMany(filter: FilterUser): Promise<IPaginator<UserModel>> {
        try {
            let queryBuilder = this.userEntityRepository.createQueryBuilder('user');
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
                            qb.orWhere('user.user_id LIKE :user_id_text', {
                                user_id_text: '%' + text + '%',
                            });
                        }),
                    );
                }
            }
            return PaginateCreate<UserEntity>(queryBuilder, pageFiltro, limitFiltro);
        } catch (error) {
            console.error(error);
            throw new BadRequestException({
                descricao: 'Error findMany user! - 001',
                ...error,
            });
        }
    }
    findAll(): Promise<UserModel[]> {
        let queryBuilder = this.userEntityRepository.createQueryBuilder('user');

        return queryBuilder.getMany();
    }
}
