import { Validation } from '../../presentation/helpers/validators/validation';
import { RequiredFielfValidation } from './../../presentation/helpers/validators/required-field-validation';
import { ValidationComposite } from './../../presentation/helpers/validators/validation-composite';

export const makeSignUpValidation = (): ValidationComposite => {
    const validations: Validation[] = []
    for(const field of ['name', 'email', 'password', 'passwordConfirmation']){
        validations.push(new RequiredFielfValidation(field))
    }
    return new ValidationComposite(validations)    
}