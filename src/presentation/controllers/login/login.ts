import { Controller, HttpRequest, HttpResponse, EmailValidator, Authentication } from './login-protocols'
import { serverError, unauthorized, badRequest, ok } from './../../helpers/http-helpers';
import { InvalidParamError } from './../../errors/invalid-param-error';
import { MissingParamError } from './../../errors/missing-param-error';

export class LoginController implements Controller {
    private readonly emailValidator: EmailValidator
    private readonly authentication: Authentication
    constructor(emailValidator: EmailValidator, authentication: Authentication){
        this.emailValidator = emailValidator
        this.authentication = authentication
    }
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        try{

            const {email, password} = httpRequest.body    
            if(!email){
                return (badRequest(new MissingParamError('email')))
            }if(!password){
                return (badRequest(new MissingParamError('password')))
            }
            const isValid = this.emailValidator.isValid(email)
            if(!isValid){
                return (badRequest(new InvalidParamError('email')))
            }
            const accessToken = await this.authentication.auth(email, password)
            if(!accessToken){
                return unauthorized()
            }
            return ok({accessToken})
        }catch(err){
            return serverError(err)
        }
    }
}