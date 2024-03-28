import { Account } from "../models/account.model"
import { User } from "../models/user.model"

export class AccountDto extends Account {
    type_account: string = ""
    account: string = ""
    agency: string = ""
    id: number = 0
    user: User | number = 0
}
