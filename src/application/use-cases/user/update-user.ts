import { Injectable } from '@nestjs/common';
import { IBcryptService } from 'src/domain/adapters/bcrypt.interface';
import { ILogger } from 'src/domain/adapters/logger.interface';
import { UserModel } from 'src/domain/models/user';
import { IUserRepository } from 'src/domain/repositories/user-repository';

interface UpdateUserRequest {
    user: Partial<UserModel>;
    user_id: number;
}

interface UpdateUserResponse {
    userUpdated: UserModel;
}

@Injectable()
export class UpdateUser {
    constructor(private readonly logger: ILogger, private readonly userRepository: IUserRepository, private readonly bcryptService: IBcryptService) {}

    async execute(request: UpdateUserRequest): Promise<UpdateUserResponse> {
        const { user_id, user } = request;

        const userUpdated = await this.userRepository.update(user_id, user);

        // this.logger.log('FindUserCases execute', 'New user have been created');

        return { userUpdated };
    }
}
