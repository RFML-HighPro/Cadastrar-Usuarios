import { ServicesGeneralUser } from "../services/user/general-services"
import { UserService } from "../services/user/user.service"
import { UserRepository } from "../repository/user.repository"
import { Router } from "express"
import { UserDto } from "../dtos/user.dto"
import { AlterPwd } from "../interfaces/interfaces.services"

export class UserController {
    private router: Router
    constructor(private readonly services: UserService) {
        this.router = Router()
    }
    handle() {
        this.router.put("/:id", async (request, response) => {
            let id: number = Number(request.params.id)
            let user: UserDto = { id, ...request.body }
            let reply = await this.services.updateUser(user)
            response.json(reply.body).status(reply.statusCode)
        })
        this.router.patch("/:id", async (request, response) => {
            let id: number = Number(request.params.id)
            let user: AlterPwd = { id, ...request.body }
            let reply = await this.services.alterPwdUser(user)
            response.json(reply.body).status(reply.statusCode)
        })
        this.router.get("/id", async (request, response) => {
            let user: UserDto = request.body
            let reply = await this.services.searchUser(user)
            response.json(reply.body).status(reply.statusCode)
        })
        this.router.post("/create", async (request, response) => {
            let user: UserDto = request.body
            let reply = await this.services.saveUser(user)
            response.json(reply.body).status(reply.statusCode)
        })
        this.router.delete("/:id", async (request, response) => {
            let parameter = { id: Number(request.params.id) } as UserDto
            let reply = await this.services.removalUser(parameter)
            response.json(reply.body).status(reply.statusCode)
        })
        this.router.get("/auth", async (request, response) => {
            let user: UserDto = request.body
            let reply = await this.services.authUser(user)
            response.json(reply.body).status(reply.statusCode)
        })
        this.router.get("/all", async (request, response) => {
            let reply = await this.services.retrieveUsers()
            response.json(reply.body).status(reply.statusCode)
        })
        return this.router
    }
}

export default new UserController(
    new UserService(new ServicesGeneralUser(), new UserRepository())
).handle()
