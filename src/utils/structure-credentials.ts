import { UserDto } from "../dtos/user.dto"
import { AlterPwd } from "../interfaces/interfaces.services"
import { denyNull } from "./find-not-null"

export const unmaskCpf = (data: UserDto) => {
    if (!!data.cpf) {
        data.cpf = data.cpf.replace(/[.-]/g, "")
    }
    return data
}

export const maskLengthCpf = (data: UserDto) => {
    if (!!data.cpf) {
        if (data.cpf.length !== 11) {
            throw new Error("CPF Inválido!")
        }
        return data
    }
    return data
}

export const maskPwd = (data: UserDto) => {
    if (!!data.password) {
        let HasLeastOneNumber = /\d/
        if (!HasLeastOneNumber.test(data.password)) {
            throw new Error("A senha deve conter ao menos um número!")
        }
        let HasLeastOneCapitalLetter = /[A-Z]/
        if (!HasLeastOneCapitalLetter.test(data.password)) {
            throw new Error("A senha deve conter ao menos uma letra maiúscula!")
        }
        let HasLeastOneLowerCaseLetter = /[a-z]/
        if (!HasLeastOneLowerCaseLetter.test(data.password)) {
            throw new Error("A senha deve conter ao menos uma letra minúscula!")
        }
        let HasLeastOneSpecialCharacter = /[!@#$%&*()_+^~{}]+/
        if (!HasLeastOneSpecialCharacter.test(data.password)) {
            throw new Error(
                "A senha deve conter ao menos um caracter especial!"
            )
        }
        if (data.password.length < 10) {
            throw new Error("A senha deve conter ao menos 10 caracteres!")
        }
    }
    return data
}

export const validatePwd = (pwd: AlterPwd) => {
    let pwdInProcess = { password: pwd.password } as UserDto
    for (let i = 0; i < 1; i++) {
        pwdInProcess = denyNull(pwdInProcess)
        pwdInProcess = maskPwd(pwdInProcess)
        pwdInProcess.password = pwd.newPassword
    }
    return pwd
}
