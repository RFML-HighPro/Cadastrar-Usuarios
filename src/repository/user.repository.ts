import { Repository } from "typeorm"
import { repositoryUser } from "../database/sql"
import { UserDto } from "../dtos/user.dto"
import { User } from "../models/user.model"
import { AccountDto } from "../dtos/account.dto"
import { AlterPwd } from "../interfaces/interfaces.services"

export class UserRepository {
    private repository: Repository<User>
    constructor() {
        this.repository = repositoryUser
    }
    public async exists(data: UserDto) {
        return await this.repository.exists({
            where: [{ cpf: data.cpf }, { email: data.email }],
        })
    }
    public async read(data: UserDto) {
        return await this.repository.findOne({
            where: [{ cpf: data.cpf }, { email: data.email }],
        })
    }
    public async readById(user: UserDto | AccountDto | AlterPwd) {
        return await this.repository.findOneBy({ id: user.id })
    }
    public async delete(filter: UserDto) {
        return await this.repository.softDelete({ id: filter.id })
    }
    public async save(user: UserDto) {
        return await this.repository.save(user)
    }
    public async readStream() {
        return await this.repository.createQueryBuilder("user").stream()
    }
    public async readAll() {
        return await this.repository.find()
    }
}
