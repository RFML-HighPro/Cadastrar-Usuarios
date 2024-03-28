import { User } from "../models/user.model"
import { AccountDto } from "./account.dto"

export class UserDto extends User {
    birthdate: Date = new Date()
    password: string = ""
    account: AccountDto
    email: string = ""
    name: string = ""
    cpf: string = ""
    id: number = 0
}
