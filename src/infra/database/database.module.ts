import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './typeorm/entities/user.entity';
import { IUserRepository } from 'src/domain/repositories/user-repository';
import { UserRepository } from './typeorm/repositories/user-repository';

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity])],
    providers: [
        {
            provide: IUserRepository,
            useClass: UserRepository,
        },
    ],
    exports: [IUserRepository],
})
export class DatabaseModule {}
