import { MissingParamError } from './../../errors/missing-param-error';
import { Controller, HttpRequest } from './../../protocols';
import { LoginController } from "./login"
import {badRequest} from '../../helpers/http-helpers'
describe('Login Controller', ()=> {
    const makeSut =(): Controller=>{
        return new LoginController()
    }
    const makeFakeHttpRequest = (): HttpRequest => ({
        body: {
        // email:'email_valid@mail.com',
        password:'any_password'
    }
    })
    it('Should return 400 if no enail is provided', async()=>{
        const sut = makeSut()
        const httpResponse = await sut.handle(makeFakeHttpRequest())
        expect(httpResponse).toEqual(badRequest(new MissingParamError('email')))
    })
})