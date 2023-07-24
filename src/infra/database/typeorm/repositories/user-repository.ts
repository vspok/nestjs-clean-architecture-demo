import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { FilterUser, IUserRepository } from 'src/domain/repositories/user-repository';
import { UserModel } from 'src/domain/models/user';

@Injectable()
export class UserRepository implements IUserRepository {
    constructor(
        @InjectRepository(UserEntity)
        private readonly userEntityRepository: Repository<UserEntity>,
    ) {}
    create(user: UserModel): Promise<UserModel> {
        throw new Error('Method not implemented.');
    }
    update(userId: number, user: Partial<UserModel>): Promise<UserModel> {
        throw new Error('Method not implemented.');
    }
    delete(userId: number): Promise<void> {
        throw new Error('Method not implemented.');
    }
    findOne(filter: Partial<UserModel>): Promise<UserModel> {
        throw new Error('Method not implemented.');
    }
    findMany(filter: FilterUser): Promise<UserModel[]> {
        throw new Error('Method not implemented.');
    }
    findAll(): Promise<UserModel[]> {
        throw new Error('Method not implemented.');
    }
}
