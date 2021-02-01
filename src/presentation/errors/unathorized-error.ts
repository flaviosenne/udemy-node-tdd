export class UnathorizedError extends Error {
    constructor(){
        super('internal Server Error')
        this.name = 'Unathorized'
    }
}