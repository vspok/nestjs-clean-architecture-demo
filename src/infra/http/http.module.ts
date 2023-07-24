import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { UsersController } from "./controllers/user.controller";
import { CreateUser } from "src/application/use-cases/user/create-user";
import { LoggerModule } from "../services/logger/logger.module";
import { BcryptModule } from "../services/bcrypt/bcrypt.module";

const USE_CASES_USER = [
    CreateUser,
    // UpdateUser,
    // DeleteUser
    // FindUser,
    // FindManyUser,
    // FindAllUser,
]

@Module({
    imports:[DatabaseModule, LoggerModule, BcryptModule],
    controllers:[UsersController],
    providers:[
        ...USE_CASES_USER,
    ]
})

export class HttpModule{}
