import { SignUpController } from "./signup"

describe('Signup Controller', ()=> {
    it('Should return 400 if no name is provider',()=> {
        const sut = new SignUpController()

        const httpRequest = {
            name: 'any_name',
            email:'any_email@mail.com',
            password:'any_password',
            passwordConfirmation: 'any_password'
        }
        const httpResponse = sut.handle(httpRequest)
        expect(httpResponse.statusCode).toBe(400)
        expect(httpResponse.body).toEqual(new Error('Missing param: name'))
    })
})