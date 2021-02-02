import { EmailValidator } from '../../../presentation/protocols/email-validator';
import { CompareFieldsfValidation } from '../../../presentation/helpers/validators/compare-fields-validation';
import { Validation } from '../../../presentation/helpers/validators/validation';
import { RequiredFielfValidation } from '../../../presentation/helpers/validators/required-field-validation';
import { ValidationComposite } from '../../../presentation/helpers/validators/validation-composite';
import { makeSignUpValidation}from './signup-validation'
import { EmailValidation } from '../../../presentation/helpers/validators/email-validation';

jest.mock('../../../presentation/helpers/validators/validation-composite')
const makeEmailValidator = (): EmailValidator => {
    class EmailValidatorStub implements EmailValidator {
        isValid(email: string): boolean {
            return true
        }
    }
    return new EmailValidatorStub()
}

describe('SignUpValidation Factory', ()=> {
    it('Should call ValidationComposite with all validations', ()=> {
        makeSignUpValidation()
        const validations: Validation[] = []
        for(const field of ['name', 'email', 'password', 'passwordConfirmation']){
            validations.push(new RequiredFielfValidation(field))
        }
        validations.push(new CompareFieldsfValidation('password', 'passwordConfirmation'))
        validations.push(new EmailValidation('email', makeEmailValidator()))
        expect(ValidationComposite).toHaveBeenCalledWith(validations)
    })
})