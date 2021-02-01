import { MissingParamError } from './../../errors/missing-param-error';
import { badRequest } from '../../helpers/http-helpers'
import { Controller, HttpRequest, HttpResponse } from '../../protocols'
export class LoginController implements Controller {
    async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
        return new Promise(resolve => {
            if(!httpRequest.body.email){
                return resolve(badRequest(new MissingParamError('email')))
            }if(!httpRequest.body.password){
                return resolve(badRequest(new MissingParamError('password')))
            }
        })
    }
}