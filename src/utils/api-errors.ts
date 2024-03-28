abstract class ApiErrors extends Error {
    private statusHTTP: number
    constructor(message: string, error: number) {
        super(message)
        this.statusHTTP = error
    }
}

export class BadRequest extends ApiErrors {
    constructor(message: string) {
        super(message, 400)
    }
}

export class BadServer extends ApiErrors {
    constructor(message: string) {
        super(message, 500)
    }
}
