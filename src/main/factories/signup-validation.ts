import { EmailValidatorAdapter } from './../../utils/email-validator-adapter';
import { CompareFieldsfValidation } from '../../presentation/helpers/validators/compare-fields-validation';
import { Validation } from '../../presentation/helpers/validators/validation';
import { RequiredFielfValidation } from './../../presentation/helpers/validators/required-field-validation';
import { ValidationComposite } from './../../presentation/helpers/validators/validation-composite';
import { EmailValidation } from '../../presentation/helpers/validators/email-validation';

export const makeSignUpValidation = (): ValidationComposite => {
    const validations: Validation[] = []
    for(const field of ['name', 'email', 'password', 'passwordConfirmation']){
        validations.push(new RequiredFielfValidation(field))
    }
    validations.push(new CompareFieldsfValidation('password', 'passwordConfirmation'))
    validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
    return new ValidationComposite(validations)    
}