export const denyNull = (data: any) => {
    for (let key in data) {
        if (!data[key]) {
            throw new Error(`O campo ${key} é obrigatório!`)
        }
    }
    return data
}
