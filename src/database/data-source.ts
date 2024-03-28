import { DataSource } from "typeorm"
import { User } from "../models/user.model"
import "dotenv/config"
import "reflect-metadata"
import { Account } from "../models/account.model"

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    entities: [User, Account],
    migrations: [`${__dirname}/**/migrations/*.{ts,js}`],
})
