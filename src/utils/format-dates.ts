import { format } from "date-fns"

export const formatDates = (date: Date) => {
    return format(date, "dd/MM/yyyy HH:mm")
}
