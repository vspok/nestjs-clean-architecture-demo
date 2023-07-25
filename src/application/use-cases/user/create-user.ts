import { Injectable } from '@nestjs/common';
import { IBcryptService } from 'src/domain/adapters/bcrypt.interface';
import { ILogger } from 'src/domain/adapters/logger.interface';
import { UserModel } from 'src/domain/models/user';
import { IUserRepository } from 'src/domain/repositories/user-repository';

interface CreateUserRequest {
    name: string;
    email: string;
    password: string;
}

interface CreateUserResponse {
    user: UserModel;
}

@Injectable()
export class CreateUser {
    constructor(
        private readonly logger: ILogger,
        private readonly userRepository: IUserRepository,
        private readonly bcryptService: IBcryptService,
    ) {}

    async execute(request: CreateUserRequest): Promise<CreateUserResponse> {
        const user = new UserModel();
        user.name = request.name;
        user.email = request.email;
        user.password = await this.bcryptService.hash(request.password);

        const created_user = await this.userRepository.create(user);

        this.logger.log(
            'createUserCases execute',
            'New user have been created',
        );

        return { user: created_user };
    }
}
