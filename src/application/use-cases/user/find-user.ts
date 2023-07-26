import { Injectable } from '@nestjs/common';
import { IBcryptService } from 'src/domain/adapters/bcrypt.interface';
import { ILogger } from 'src/domain/adapters/logger.interface';
import { UserModel } from 'src/domain/models/user';
import { IUserRepository } from 'src/domain/repositories/user-repository';

interface FindUserRequest {
    filter: Partial<UserModel>;
}

interface FindUserResponse {
    user: UserModel;
}

@Injectable()
export class FindUser {
    constructor(private readonly logger: ILogger, private readonly userRepository: IUserRepository, private readonly bcryptService: IBcryptService) {}

    async execute(request: FindUserRequest): Promise<FindUserResponse> {
        const { filter } = request;

        const user = await this.userRepository.findOne(filter);

        // this.logger.log('FindUserCases execute', 'New user have been created');

        return { user };
    }
}
