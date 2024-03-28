import { UserDto } from "../dtos/user.dto"
import { User } from "../models/user.model"

export type responseRepository = User | User[] | boolean | ResultUpdAndRmv

export interface ResultUpdAndRmv {
    generatedMaps: any[]
    raw: any[]
    affected: number
}

export interface ResponseAuth {
    name: string
    age: number
}

export interface AlterPwd extends UserDto {
    newPassword: string
}
