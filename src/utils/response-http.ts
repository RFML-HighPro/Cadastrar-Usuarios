import { HttpResponse } from "../dtos/http-response.dto"

export const responseHTTP = <T>(data: T, statusCode: number) => {
    return {
        statusCode,
        body: data,
    } as HttpResponse<T>
}
