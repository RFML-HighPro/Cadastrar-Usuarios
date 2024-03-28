import { UserRepository } from "../../repository/user.repository"
import { ServicesGeneralUser } from "./general-services"
import { responseHTTP } from "../../utils/response-http"
import { UserDto } from "../../dtos/user.dto"
import { authEmail, authEmail, sendEmail } from "../../utils/email"
import { AlterPwd, ResponseAuth } from "../../interfaces/interfaces.services"
import { authPassword, encryptpwd } from "../../utils/encryption"
import { denyNull } from "../../utils/find-not-null"
import { validatePwd } from "../../utils/structure-credentials"
import Stream from "pg-query-stream"

export class UserService {
    constructor(
        private user: ServicesGeneralUser,
        private repository: UserRepository
    ) {}
    public async updateUser(updateUser: UserDto) {
        try {
            let userExists = await this.repository.readById(updateUser)

            if (!userExists) throw new Error("Usuário não encontrado!")
            updateUser = this.user.validateUser(updateUser)

            let authPwd = authPassword(updateUser, userExists.password)
            if (!authPwd) throw new Error("Senha Incorreta!")

            console.log("password certo!")
            if (!!updateUser.email) {
                let userAuth = await this.repository.exists(updateUser)
                if (!userAuth) throw new Error("Email já em uso!")
                // userAuth = await authEmail(updateUser.email)
                // if (!userAuth) throw new Error("Email inválido!")
            }
            // if (!!updateUser.cpf) {
            //     let userAuth = await this.repository.exists(updateUser)
            //     if (!!userAuth) throw new Error("CPF em uso!")
            // }
            // let userUpdate = await this.repository.save(updateUser)
            // if (!userUpdate) throw new Error("Atualização falhou!")
            // sendEmail({
            //     email: userExists.email,
            //     option: "update",
            //     auth: true,
            // })
            return responseHTTP<string>(this.user.emitSucess("upd"), 200)
        } catch (error: any) {
            return responseHTTP<string>(error.message, 400)
        }
    }
    public async alterPwdUser(password: AlterPwd) {
        try {
            let user = await this.repository.readById(password)
            if (!user) throw new Error("Usuário não encontrado!")
            password = validatePwd(password)
            let pwdIsEqual = authPassword(password, user.password)
            if (!pwdIsEqual) throw new Error("Senha Incorreta!")
            password.password = password.newPassword
            let pwdNewExist = await this.repository.exists(password)
            if (!!pwdNewExist) throw new Error("Nova senha em uso!")
            user.password = password.newPassword
            user = encryptpwd(password)
            let pwdUpdate = await this.repository.save(password)
            if (!pwdUpdate) throw new Error("Atualização falhou!")
            sendEmail({
                email: user.email,
                option: "altPwd",
                auth: true,
            })
            return responseHTTP<string>(this.user.emitSucess("pwd"), 200)
        } catch (error: any) {
            return responseHTTP<string>(error.message, 400)
        }
    }
    public async saveUser(newUser: UserDto) {
        try {
            newUser = this.user.validateUser(newUser)
            let users = await this.repository.readAll()
            newUser = this.user.validateCredentials(users, newUser)
            let userAuth = await authEmail(newUser.email)
            if (!userAuth) throw new Error("Email Inválido")
            newUser = encryptpwd(newUser)
            let userSave = await this.repository.save(newUser)
            sendEmail({
                email: userSave.email,
                auth: userAuth,
                name: userSave.name,
                option: "create",
            })
            return responseHTTP<string>("Pronto", 201)

            // let existsUser = await this.repository.exists(newUser)
            // if (!!existsUser) throw new Error("Usuário Existente!")
            // newUser = this.user.validateUser(newUser)

            // // let userAuth = await authEmail(newUser.email)
            // // if (!userAuth) throw new Error("Email inválido!")
            // newUser = encryptpwd(newUser)
            // let userSave = await this.repository.save(newUser)
            // // sendEmail({
            // //     email: userSave.email,
            // //     auth: userAuth,
            // //     name: userSave.name,
            // //     option: "create",
            // // })
            // return responseHTTP<UserDto>(userSave, 201)
        } catch (error: any) {
            return responseHTTP<string>(error.message, 400)
        }
    }
    public async authUser(userAuth: UserDto) {
        try {
            userAuth = this.user.validateUser(userAuth)
            let user = await this.repository.read(userAuth)
            if (!user) throw new Error("Usuário não encontrado!")
            let pwdIsEqual = authPassword(userAuth, user.password)
            if (!pwdIsEqual) throw new Error("Senha Incorreta!")
            let responseAuth = this.user.returnAuthUser(user)
            if (!responseAuth) throw new Error("Autenticação Falhou!")
            return responseHTTP<ResponseAuth>(responseAuth, 200)
        } catch (error: any) {
            return responseHTTP<string>(error.message, 400)
        }
    }
    public async removalUser(deleteUser: UserDto) {
        try {
            let userExist = await this.repository.readById(deleteUser)
            if (!userExist) throw new Error("Usuário não encontrado!")
            let authPwd = authPassword(deleteUser, userExist.password)
            if (!authPwd) throw new Error("Senha Incorreta!")
            let deleted = await this.repository.delete(deleteUser)
            if (deleted.affected === 0) throw new Error("Remoção falhou!")
            sendEmail({
                email: userExist.email,
                option: "delete",
                auth: true,
            })
            return responseHTTP<string>(this.user.emitSucess("del"), 200)
        } catch (error: any) {
            return responseHTTP<string>(error.message, 400)
        }
    }
    public async searchUser(userSearch: UserDto) {
        try {
            userSearch = this.user.validateUser(userSearch)
            let user = await this.repository.read(userSearch)
            if (!user) throw new Error("Usuário não encontrado!")
            let pwdIsEqual = authPassword(userSearch, user.password)
            if (!pwdIsEqual) throw new Error("Senha Incorreta!")
            return responseHTTP<UserDto>(user, 200)
        } catch (error: any) {
            return responseHTTP<string>(error.message, 400)
        }
    }
    public async retrieveUsers() {
        try {
            let users = await this.repository.readAll()
            if (users.length === 0) {
                throw new Error("Nenhum usuário encontrado!")
            }
            return responseHTTP<UserDto[]>(users, 200)
        } catch (error: any) {
            return responseHTTP<string>(error.message, 400)
        }
    }
}
