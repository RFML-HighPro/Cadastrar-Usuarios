import { formatDates } from "./format-dates"
import nodemailer from "nodemailer"
import axios from "axios"

export const authEmail = async (email: string) => {
    try {
        const url = setSettingAuthEmail(email)
        const response = await axios.get(url)
        const dataSource = response.data.data.status
        const emailNotValid = dataSource === "invalid"
        const emailValid = dataSource === "valid"
        if (emailNotValid) return false
        if (emailValid) return true
        return false
    } catch (error) {
        throw new Error("Erro ao autenticar Email!")
    }
}

export const setSettingAuthEmail = (email: string) => {
    const emailUser = email
    const apiKey = process.env.API_EMAIL
    const api_url = `https://api.hunter.io/v2/email-verifier?email=${emailUser}&api_key=${apiKey}`
    return api_url as string
}

export const sendEmail = (data: sendEmail) => {
    const { email, option, auth, name } = data
    if (!!auth) {
        const optionsOfSend = createTransporter()
        const optionsOfTransporte = setMailOptions(email, option, name)
        optionsOfSend.sendMail(optionsOfTransporte, (error, info) => {
            if (error) {
                throw new Error("Erro ao enviar email!")
            }
        })
        return
    }
    throw new Error("Email inválido!")
}

export const createTransporter = () => {
    return nodemailer.createTransport({
        service: "Gmail",
        auth: {
            user: process.env.USER_EMAIL,
            pass: process.env.USER_PASS,
        },
    })
}

export const setMailOptions = (
    email: string,
    option: string,
    name?: string
) => {
    return {
        from: process.env.USER_EMAIL,
        to: email,
        subject: setSubject(option),
        text: setText(option, name),
    }
}

export const setSubject = (option: string) => {
    if (option === "create") return "Usuário criado com Sucesso!"
    if (option === "update") return "Atualização Efetuada!"
    if (option === "delete") return "Remoção Efetuada!"
    if (option === "altPwd") return "Senha Alterada!"
}

export const setText = (option: string, name?: string) => {
    if (option === "update") {
        return `Alerta! Atualização efetuada ${formatDates(
            new Date()
        )}, verifique a atividade!`
    }
    if (option === "delete") {
        return `Alerta! Remoção efetuada ${formatDates(
            new Date()
        )}, verifique a atividade!`
    }
    if (option === "altPwd") {
        return `Alerta! Alteração de senha efetuada ${formatDates(
            new Date()
        )}, verifique a atividade!`
    }
    if (option === "create") {
        return `Parabéns! ${name}, você agora faz parte da comunidade🤝!`
    }
}

export interface sendEmail {
    email: string
    option: string
    auth: boolean
    name?: string
}
