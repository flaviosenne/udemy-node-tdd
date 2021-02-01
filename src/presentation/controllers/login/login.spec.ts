import { EmailValidator } from './../../protocols/email-validator';
import { MissingParamError } from './../../errors/missing-param-error';
import { Controller } from './../../protocols';
import { LoginController } from "./login"
import { badRequest } from '../../helpers/http-helpers'
describe('Login Controller', () => {
    const makeEmailValidator = (): EmailValidator =>{
        class EmailValidatorStub implements EmailValidator {
            isValid(email: string):  boolean{
                return true
            }
        }
        return new EmailValidatorStub()
    }
    interface SutTypes {
        sut: LoginController,
        emailValidatorStub: EmailValidator
    }
    const makeSut = (): SutTypes => {
        const emailValidatorStub = makeEmailValidator()
        const sut= new LoginController(emailValidatorStub)
        return {sut, emailValidatorStub}
    }

    it('Should return 400 if no enail is provided', async () => {
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
    it('Should call EmailValidator with correct email',async()=>{
        const { sut, emailValidatorStub} = makeSut()
        const isValidSpy = jest.spyOn(emailValidatorStub, `isValid`)
        const httpRequest ={
            body: {
                email:'valid_email@mail.com',
                password:'valid_password',
            }
        }
        await sut.handle(httpRequest)
        expect(isValidSpy).toHaveBeenLastCalledWith(`valid_email@mail.com`)
    })
})