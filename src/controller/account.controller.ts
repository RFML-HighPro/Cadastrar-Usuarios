import { Router } from "express"
import { AccountDto } from "../dtos/account.dto"
import { AccountService } from "../services/account/account.service"
import { repositoryAccount } from "../database/sql"
import { AccountRepository } from "../repository/account.repository"
import { UserRepository } from "../repository/user.repository"

export class AccountController {
    private router: Router
    constructor(private services: AccountService) {
        this.router = Router()
    }
    handle() {
        this.router.post("/create", async (request, response) => {
            const account: AccountDto = request.body
            const reply = await this.services.saveAccount(account)
            response.json(reply.body).status(reply.statusCode)
        })
        this.router.get("/all", async (request, response) => {
            const reply = await this.services.readAllAccounts()
            response.json(reply.body).status(reply.statusCode)
        })
        return this.router
    }
}

export default new AccountController(
    new AccountService(new AccountRepository(), new UserRepository())
).handle()
