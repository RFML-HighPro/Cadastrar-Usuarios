import InfoSimples, { InfoSimplesClient } from "infosimples-sdk"
import { UserDto } from "../dtos/user.dto"
import { denyNull } from "./find-not-null"
import axios from "axios"

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
    if (!!data.password || !!data.newPassword) {
        let HasLeastOneSpecialCharacter = /[!@#$%&*()_+^~{}]+/
        if (!HasLeastOneSpecialCharacter.test(data.password)) {
            throw new Error(
                "A senha deve conter ao menos um caracter especial!"
            )
        }
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
        if (data.password.length < 10) {
            throw new Error("A senha deve conter ao menos 10 caracteres!")
        }
    }
    return data
}

export const validatePwd = (pwd: UserDto) => {
    pwd = denyNull(pwd)
    let pwdInProcess = { password: pwd.password } as UserDto
    for (let i = 0; i <= 1; i++) {
        console.log(i)
        pwdInProcess = maskPwd(pwdInProcess)
        pwdInProcess = { password: pwd.newPassword } as UserDto
    }
    return pwd
}
export const settingAuthCPF = (user: UserDto) => {
    return {
        url: "https://api.infosimples.com/api/v2/consultas/receita-federal/cpf",
        sendHeader: {
            cpf: user.cpf,
            birthdate: user.birthdate,
            origem: "web",
            token: String(process.env.KEY_CPF),
            timeout: 300,
        },
    }
}
export const authCPF = async (user: UserDto) => {
    let setting = settingAuthCPF(user)
    let response = await axios.post(setting.url, setting.sendHeader)
    if (response.data.code !== 200 || response.data.errors.length !== 0) {
        return false
    }
    return true
}
