import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './typeorm/entities/user.entity';
import { IUserRepository } from 'src/domain/repositories/user-repository';
import { UserRepository } from './typeorm/repositories/user-repository';
import { FunctionEntity } from './typeorm/entities/functions.entity';
import { GroupFunctionEntity } from './typeorm/entities/group_functions.entity';

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity, FunctionEntity, GroupFunctionEntity])],
    providers: [
        {
            provide: IUserRepository,
            useClass: UserRepository,
        },
    ],
    exports: [IUserRepository],
})
export class DatabaseModule {}
