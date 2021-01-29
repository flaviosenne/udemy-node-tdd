export class ServerError extends Error {
    constructor(){
        super('internal Server Error')
        this.name = 'Server Error'
    }
}