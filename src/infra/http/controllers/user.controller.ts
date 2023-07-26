import { Controller, Get } from '@nestjs/common';
import { Body, Delete, Param, Patch, Post, Put, Query, UseGuards } from '@nestjs/common/decorators';
import { ApiExtraModels, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserViewModel } from '../view-models/user-view-model';
import { CreateUser } from 'src/application/use-cases/user/create-user';
import { CreateUserBody } from '../dtos/create-user-body';
import { AuthGuard } from 'src/infra/guards/auth.guard';
import { UpdateUser } from 'src/application/use-cases/user/update-user';
import { UpdateUserBody } from '../dtos/update-user-body';
import { FindManyUser } from 'src/application/use-cases/user/find-many-user';

@Controller('user')
@ApiTags('user')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels(UserViewModel)
export class UsersController {
    constructor(private createUser: CreateUser, private updateUser: UpdateUser, private findManyUser: FindManyUser) {}

    @UseGuards(AuthGuard)
    @ApiOperation({ summary: 'create User' })
    @Post()
    async create(@Body() body: CreateUserBody) {
        const { user } = await this.createUser.execute(body);
        return new UserViewModel(user);
    }

    @UseGuards(AuthGuard)
    @ApiOperation({ summary: 'Update User' })
    @Post(':user_id')
    async update(@Param('user_id') user_id: string,@Body() body: UpdateUserBody) {
        const { userUpdated } = await this.updateUser.execute({user_id: +user_id, user: body});
        return new UserViewModel(userUpdated);
    }
    @UseGuards(AuthGuard)
    @ApiOperation({ summary: 'FindMany User' })
    @Get('')
    async findMany(@Query() filter) {
        const { userPage } = await this.findManyUser.execute({filter});
        // return new UserViewModel(userUpdated);
        return userPage;
    }
}
