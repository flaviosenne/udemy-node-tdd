import { Authentication, Validation } from './login-protocols';
import { serverError, unauthorized, badRequest, ok } from './../../helpers/http-helpers';
import { MissingParamError } from './../../errors/missing-param-error';
import { LoginController } from "./login"
import { HttpRequest } from '../../protocols';
describe('Login Controller', () => {
    const makeValidation = (): Validation => {
        class ValidationStub implements Validation {
            validate(input: any): Error {
                return null
            }
        }
        return new ValidationStub()
    }
    const makeAuthentication = (): Authentication =>{
        class AuthenticationStub implements Authentication {
            async auth(email: string, password: string):  Promise<string>{
                return new Promise(resolve => resolve('any_token'))
            }
        }
        return new AuthenticationStub()
    }
    const makeFakeHttpRequest = (): any=> ({
        body: {
            email:'valid_email@mail.com',
            password:'valid_password',
        }
    })
    const makeFakeRequest = (): HttpRequest => ({
        body: {
            name: 'valid_name',
            email: 'valid_email@mail.com',
            password: 'valid_password',
            passwordConfirmation: 'valid_password'
        }
    
    })
    interface SutTypes {
        sut: LoginController
        authenticationStub: Authentication
        validationStub: Validation
    }
    const makeSut = (): SutTypes => {
        const authenticationStub = makeAuthentication()
        const validationStub = makeValidation()
        const sut= new LoginController( authenticationStub, validationStub)
        return {sut, authenticationStub,validationStub}
    }

   
    it('Should call authetication with correct values 500 if EmailValidator throws',async()=>{
        const { sut, authenticationStub} = makeSut()
        const authSpy = jest.spyOn(authenticationStub, 'auth')
        await sut.handle(makeFakeHttpRequest())
        expect(authSpy).toHaveBeenCalledWith('valid_email@mail.com', 'valid_password')
    })
    it('Should return 401 if invalid credentials provided',async()=>{
        const { sut, authenticationStub} = makeSut()
        jest.spyOn(authenticationStub, 'auth').mockReturnValueOnce(new Promise(resolve => resolve(null)))
        const httpResponse = await sut.handle(makeFakeHttpRequest())
        expect(httpResponse).toEqual(unauthorized())
    })
    it('Should return 500 if Authentication throws',async()=>{
        const { sut, authenticationStub} = makeSut()
        jest.spyOn(authenticationStub, 'auth').mockRejectedValueOnce(new Promise((resolve, reject) => reject(new Error())))
        const httpResponse = await sut.handle(makeFakeHttpRequest())
        expect(httpResponse).toEqual(serverError(new Error))
    })
    it('Should return 200 if valid credentials are provided',async()=>{
        const { sut} = makeSut()
        const httpResponse = await sut.handle(makeFakeHttpRequest())
        expect(httpResponse).toEqual(ok({ accessToken: 'any_token'}))
    })
    test('Should call Validation with correct value', async () => {
        const { sut, validationStub } = makeSut()
        const validateSpy = jest.spyOn(validationStub, 'validate')
        const httpRequest =makeFakeRequest()
        await sut.handle(httpRequest)
        expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
    })
    test('Should return 400 if Validation returns an error', async () => {
        const { sut, validationStub } = makeSut()
        jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('any_field'))
        const httpResponse = await sut.handle(makeFakeRequest())
        expect(httpResponse).toEqual(badRequest(new MissingParamError('any_field')))
    })
})