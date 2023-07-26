import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { UsersController } from './controllers/user.controller';
import { CreateUser } from 'src/application/use-cases/user/create-user';
import { LoggerModule } from '../services/logger/logger.module';
import { BcryptModule } from '../services/bcrypt/bcrypt.module';
import { CheckJWTAuth } from 'src/application/use-cases/auth/check-jwt-auth';
import { JwtModule } from '../services/jwt/jwt.module';
import { SetUserRequestAuth } from 'src/application/use-cases/auth/set-user-request-auth';
import { ResetJWTAuth } from 'src/application/use-cases/auth/reset-jwt-auth';
import { LoginAuth } from 'src/application/use-cases/auth/login-auth';
import { CreateJWTAuth } from 'src/application/use-cases/auth/create-jwt-auth';
import { CheckUserAuth } from 'src/application/use-cases/auth/check-user-auth';
import { AuthsController } from './controllers/auth.controller';
import { UpdateUser } from 'src/application/use-cases/user/update-user';
import { DeleteUser } from 'src/application/use-cases/user/delete-user';
import { FindManyUser } from 'src/application/use-cases/user/find-many-user';
import { FindUser } from 'src/application/use-cases/user/find-user';

const USE_CASES_USER = [
    CreateUser,
    UpdateUser,
    DeleteUser,
    FindUser,
    FindManyUser,
    // FindAllUser,
];
const USE_CASES_AUTH = [CheckJWTAuth, CheckUserAuth, CreateJWTAuth, SetUserRequestAuth, ResetJWTAuth, LoginAuth];
@Module({
    imports: [DatabaseModule, LoggerModule, BcryptModule, JwtModule],
    controllers: [UsersController, AuthsController],
    providers: [...USE_CASES_USER, ...USE_CASES_AUTH],
})
export class HttpModule {}
