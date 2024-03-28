import { Repository } from "typeorm"
import { repositoryAccount } from "../database/sql"
import { Account } from "../models/account.model"
import { AccountDto } from "../dtos/account.dto"

export class AccountRepository {
    private repository: Repository<Account>
    constructor() {
        this.repository = repositoryAccount
    }
    public async save(account: AccountDto) {
        return this.repository.save(account)
    }
    public async readAll() {
        return this.repository.find({ relations: ["user"] })
    }
}
