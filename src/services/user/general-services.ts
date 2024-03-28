import { UserDto } from "../../dtos/user.dto"
import { AlterPwd } from "../../interfaces/interfaces.services"
import { authPassword } from "../../utils/encryption"
import { denyNull } from "../../utils/find-not-null"
import {
    unmaskCpf,
    maskLengthCpf,
    maskPwd,
} from "../../utils/structure-credentials"

export class ServicesGeneralUser {
    public validateCredentials(users: UserDto[], newUser: UserDto) {
        users.forEach((user) => {
            if (user.cpf === newUser.cpf)
                throw new Error("CPF já está sendo usado!")
            if (user.email === newUser.email)
                throw new Error("Email já está sendo usado!")
            if (authPassword(newUser, user.password))
                throw new Error("Senha já está sendo usada!")
        })
        return newUser
    }
    public validateUser(user: UserDto) {
        user = denyNull(user)
        user = unmaskCpf(user)
        user = maskLengthCpf(user)
        user = maskPwd(user)
        return user
    }
    public returnAuthUser(user: UserDto) {
        return {
            name: user.name,
            age: this.getAge(user),
        }
    }
    public getAge(user: UserDto) {
        let today = new Date()
        let birthdate = new Date(user.birthdate as Date)
        let age = today.getFullYear() - birthdate.getFullYear()
        const month = today.getMonth() - birthdate.getMonth()
        if (
            month < 0 ||
            (month === 0 && today.getDate() < birthdate.getDate())
        ) {
            age--
        }
        return age
    }
    public emitSucess(origin: string) {
        if (origin === "upd") return "Usuário atualizado com sucesso!"
        if (origin === "del") return "Usuário removido com sucesso!"
        if (origin === "pwd") return "Senha alterada com sucesso!"
        return "Operação bem-sucedida!"
    }
}
