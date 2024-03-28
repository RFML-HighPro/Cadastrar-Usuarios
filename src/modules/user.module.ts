import { deleteProper } from "../utils/delete-proper.utils"
import { turnInDate } from "../utils/turn-date.utils"
import { mergerObject } from "../utils/merger-object.utils"
import { createProper } from "../utils/create-proper.utils"

export class FitDate {
    public adjustDate(object: any, proper: string) {
        const date = turnInDate(object.birthdate as string)
        const raw = deleteProper(object, proper)
        const item = createProper(date, "birthdate")
        const merged = mergerObject(raw, item)
        return merged
    }
}
