import { BadRequestException, Injectable } from '@nestjs/common';
import { IBcryptService } from 'src/domain/adapters/bcrypt.interface';
import { ILogger } from 'src/domain/adapters/logger.interface';
import { UserModel } from 'src/domain/models/user';
import { IUserRepository } from 'src/domain/repositories/user-repository';
import { IFilterOptions } from 'src/helpers/interfaces/filter-options';
import { IPaginator } from 'src/helpers/interfaces/paginator-response-interface';

interface FindManyUserRequest {
    filter: IFilterOptions<UserModel>;
}

interface FindManyUserResponse {
    userPage: IPaginator<UserModel>;
}

@Injectable()
export class FindManyUser {
    constructor(private readonly logger: ILogger, private readonly userRepository: IUserRepository, private readonly bcryptService: IBcryptService) {}

    async execute(request: FindManyUserRequest): Promise<FindManyUserResponse> {
        const { filter } = request;

        const userPage = await this.userRepository.findMany(filter);

        // this.logger.log('FindManyUserCases execute', 'New user have been created');

        return { userPage };
    }
}
