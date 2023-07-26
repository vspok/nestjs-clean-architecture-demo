import { Injectable } from '@nestjs/common';
import { IBcryptService } from 'src/domain/adapters/bcrypt.interface';
import { ILogger } from 'src/domain/adapters/logger.interface';
import { UserModel } from 'src/domain/models/user';
import { IUserRepository } from 'src/domain/repositories/user-repository';

interface DeleteUserRequest {
    user_id: number;
}

type DeleteUserResponse = void;

@Injectable()
export class DeleteUser {
    constructor(private readonly logger: ILogger, private readonly userRepository: IUserRepository, private readonly bcryptService: IBcryptService) {}

    async execute(request: DeleteUserRequest): Promise<DeleteUserResponse> {
        const { user_id } = request;

        const userDeleted = await this.userRepository.delete(user_id);

        // this.logger.log('FindUserCases execute', 'New user have been created');
        this.logger.log('deleteUserCases execute', `User ${user_id} have been deleted`);

    }
}
