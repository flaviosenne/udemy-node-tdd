import { MissingParamError } from './../../errors/missing-param-error';
import { Controller } from './../../protocols';
import { LoginController } from "./login"
import { badRequest } from '../../helpers/http-helpers'
describe('Login Controller', () => {
    const makeSut = (): Controller => {
        return new LoginController()
    }

    it('Should return 400 if no enail is provided', async () => {
        const sut = makeSut()
        const httpRequest = {
            body: {
                // email:'email_valid@mail.com',
                password: 'valid_password'
            }
        }
        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse).toEqual(badRequest(new MissingParamError('email')))
    })
    it('Should return 400 if no password is provided', async () => {
        const sut = makeSut()
        const httpRequest = {
            body: {
                email: 'email_valid@mail.com'
            }
        }
        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse).toEqual(badRequest(new MissingParamError('password')))
    })
})