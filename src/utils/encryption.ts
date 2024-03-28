import bcrypto from "bcrypt"
import crypto from "crypto"
import { UserDto } from "../dtos/user.dto"

export const encryptpwd = (data: UserDto) => {
    let encrypted = bcrypto.hashSync(data.password, bcrypto.genSaltSync(10))
    data.password = encrypted
    return data
}
export const authPassword = (data: UserDto, hash: string) => {
    return bcrypto.compareSync(data.password, hash)
}
export const encrypt = (data: any) => {
    let iv = crypto.randomBytes(12)
    let cipher = crypto.createCipheriv(
        "aes-256-gcm",
        Buffer.from(String(process.env.KEY_ENCRYPT), "base64"),
        iv
    )
    let encrypted = cipher.update(JSON.stringify(data))
    encrypted = Buffer.concat([encrypted, cipher.final()])
    return {
        authTag: cipher.getAuthTag().toString("base64"),
        datas: encrypted.toString("base64"),
        iv: iv.toString("base64"),
    }
}
export const decrypt = (encrypted: Encrypted) => {
    let decipher = crypto.createDecipheriv(
        "aes-256-gcm",
        Buffer.from(String(process.env.KEY_ENCRYPT), "base64"),
        Buffer.from(encrypted.iv, "base64")
    )
    decipher.setAuthTag(Buffer.from(encrypted.authTag, "base64"))
    let decrypted = decipher.update(Buffer.from(encrypted.datas, "base64"))
    decrypted = Buffer.concat([decrypted, decipher.final()])
    return JSON.parse(decrypted.toString())
}
export interface Encrypted {
    authTag: string
    datas: string
    iv: string
}
