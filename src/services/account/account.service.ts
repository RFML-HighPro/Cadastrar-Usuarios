import { AccountDto } from "../../dtos/account.dto"
import { UserDto } from "../../dtos/user.dto"
import { AccountRepository } from "../../repository/account.repository"
import { UserRepository } from "../../repository/user.repository"
import { responseHTTP } from "../../utils/response-http"

export class AccountService {
    constructor(
        private repositoryAccount: AccountRepository,
        private repositoryUser: UserRepository
    ) {}
    public async saveAccount(newAccount: AccountDto) {
        try {
            let userExists = await this.repositoryUser.readById(newAccount)
            if (!userExists) throw new Error("Usuário não encontrado!")
            newAccount.user = userExists
            let accountSave = await this.repositoryAccount.save(newAccount)
            return responseHTTP<AccountDto>(accountSave, 201)
        } catch (error: any) {
            console.log(error)
            return responseHTTP<string>(error.message, 400)
        }
    }
    public async readAllAccounts() {
        try {
            let accounts = await this.repositoryAccount.readAll()
            if (accounts.length === 0) {
                throw new Error("Nenhuma conta encontrada!")
            }
            return responseHTTP<AccountDto[]>(accounts, 200)
        } catch (error: any) {
            return responseHTTP<string>(error.message, 400)
        }
    }
}
