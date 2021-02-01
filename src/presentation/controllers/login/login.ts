import { EmailValidator } from './../../protocols/email-validator';
import { MissingParamError } from './../../errors/missing-param-error';
import { badRequest } from '../../helpers/http-helpers'
import { Controller, HttpRequest, HttpResponse } from '../../protocols'
export class LoginController implements Controller {
    private readonly emailValidator: EmailValidator
    constructor(emailValidator: EmailValidator){
        this.emailValidator = emailValidator
    }
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        return new Promise(resolve => {
            if(!httpRequest.body.email){
                return resolve(badRequest(new MissingParamError('email')))
            }if(!httpRequest.body.password){
                return resolve(badRequest(new MissingParamError('password')))
            }
            this.emailValidator.isValid(httpRequest.body.email)
        })
    }
}