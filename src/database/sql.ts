import { Account } from "../models/account.model"
import { User } from "../models/user.model"
import { AppDataSource } from "./data-source"

export const repositoryAccount = AppDataSource.getRepository(Account)
export const repositoryUser = AppDataSource.getRepository(User)
