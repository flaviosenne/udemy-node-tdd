export class ServerError extends Error {
    constructor(stack: string){
        super('internal Server Error')
        this.name = 'Server Error'
        this.stack = stack
    }
}