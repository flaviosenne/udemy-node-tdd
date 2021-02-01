import { serverError } from './../../helpers/http-helpers';
import { InvalidParamError } from './../../errors/invalid-param-error';
import { EmailValidator } from './../../protocols/email-validator';
import { MissingParamError } from './../../errors/missing-param-error';
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
    const makeFakeHttpRequest = (): any=> ({
        body: {
            email:'valid_email@mail.com',
            password:'valid_password',
        }
    })
    interface SutTypes {
        sut: LoginController,
        emailValidatorStub: EmailValidator
    }
    const makeSut = (): SutTypes => {
        const emailValidatorStub = makeEmailValidator()
        const sut= new LoginController(emailValidatorStub)
        return {sut, emailValidatorStub}
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
})