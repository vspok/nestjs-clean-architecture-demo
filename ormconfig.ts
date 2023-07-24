import { DataSourceOptions } from "typeorm";
import * as dotenv from 'dotenv'

dotenv.config({ path: process.env.NODE_ENV == "production" ? ".env.production" : ".env" })

export const config:DataSourceOptions = {
    type: 'mysql',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 3306,
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_DATABASE || 'generic_table',
    entities: [__dirname + 'src/infra/database/typeorm/entities/*{.ts,.js}'],
    synchronize: true,
    timezone: 'Z',
    charset: 'utf8mb4',
    logging: false,
}
