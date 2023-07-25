import { UserModel } from 'src/domain/models/user';
import { UserEntity } from '../entities/user.entity';

export class UserMapper {
    static toDatabase(user: UserModel): UserEntity {
        const userEntity: UserEntity = new UserEntity();

        userEntity.id = user.id;
        userEntity.name = user.name;
        userEntity.email = user.email;
        userEntity.password = user.password;
        userEntity.createdAt = user.createdAt;
        return userEntity;
    }

    static toDomain(userEntity: UserEntity): UserModel {
        const user: UserModel = new UserModel();

        user.id = userEntity.id;
        user.name = userEntity.name;
        user.email = userEntity.email;
        user.password = userEntity.password;
        user.createdAt = userEntity.createdAt;
        user.updatedAt = userEntity.updatedAt;

        return user;
    }
}
