import { Authentication, EmailValidator } from './login-protocols';
import { serverError, unauthorized, badRequest, ok } from './../../helpers/http-helpers';
import { InvalidParamError } from './../../errors/invalid-param-error';
import { MissingParamError } from './../../errors/missing-param-error';
import { LoginController } from "./login"
describe('Login Controller', () => {
    const makeEmailValidator = (): EmailValidator =>{
        class EmailValidatorStub implements EmailValidator {
            isValid(email: string):  boolean{
                return true
            }
        }
        return new EmailValidatorStub()
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
    interface SutTypes {
        sut: LoginController,
        emailValidatorStub: EmailValidator
        authenticationStub: Authentication
    }
    const makeSut = (): SutTypes => {
        const emailValidatorStub = makeEmailValidator()
        const authenticationStub = makeAuthentication()
        const sut= new LoginController(emailValidatorStub, authenticationStub)
        return {sut, emailValidatorStub, authenticationStub}
    }

    it('Should return 400 if no email is provided', async () => {
        const {sut} = makeSut()
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
        const {sut }= makeSut()
        const httpRequest = {
            body: {
                email: 'email_valid@mail.com'
            }
        }
        const httpResponse = await sut.handle(httpRequest)
        expect(httpResponse).toEqual(badRequest(new MissingParamError('password')))
    })
    it('Should return 400 if an invalid email is provided',async()=>{
        const { sut, emailValidatorStub} = makeSut()
        jest.spyOn(emailValidatorStub, `isValid`).mockReturnValueOnce(false)
        const httpResponse = await sut.handle(makeFakeHttpRequest())
        expect(httpResponse).toEqual(badRequest(new InvalidParamError('email')))
    })    
    it('Should call EmailValidator with correct email',async()=>{
        const { sut, emailValidatorStub} = makeSut()
        const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid')
        await sut.handle(makeFakeHttpRequest())
        expect(isValidSpy).toHaveBeenCalledWith('valid_email@mail.com')
    })
    it('Should return 500 if EmailValidator throws',async()=>{
        const { sut, emailValidatorStub} = makeSut()
        jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(()=> {
            throw new Error()
        })
        const httpResponse = await sut.handle(makeFakeHttpRequest())
        expect(httpResponse).toEqual(serverError(new Error))
    })
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
})