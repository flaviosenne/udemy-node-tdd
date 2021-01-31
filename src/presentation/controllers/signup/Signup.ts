import { InvalidParamError, MissingParamError } from '../../errors/index';
import {EmailValidator, Controller, HttpRequest, AddAccount,HttpResponse} from './signup-protocols'
import { badRequest, serverError, ok } from '../../helpers/http-helpers'

export class SignUpController implements Controller {
    private readonly emailValidator: EmailValidator
    private readonly addAcount: AddAccount

    constructor(emailValidator: EmailValidator, addAccount: AddAccount) {
        this.emailValidator = emailValidator
        this.addAcount = addAccount
    }
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {

        try {

            const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
           
            for (const field of requiredFields) {
                if (!httpRequest.body[field]) {

                    return badRequest(new MissingParamError(field))
                }
            }
            const {name, email ,password, passwordConfirmation} = httpRequest.body
            
            if(password !== passwordConfirmation){
                return badRequest(new InvalidParamError('passwordConfirmation'))
            }
            const isValid = this.emailValidator.isValid(email)

            if (!isValid) {
                return badRequest(new InvalidParamError('email'))
            }

            const account = await this.addAcount.add({
                name,
                email,
                password
            })

            return ok(account)
            
        } catch (err) {
           return serverError()
        }
    }
}