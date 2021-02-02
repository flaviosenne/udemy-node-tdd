import { MissingParamError } from './../../errors/missing-param-error';
import { RequiredFielfValidation } from './required-field-validation';
describe('RequiredField Validation',() => {
    it('Should Return a MissingParamError if validation fails',()=>{
        const sut = new RequiredFielfValidation('field')
        const error = sut.validate({ name: 'any_name'})
        expect(error).toEqual(new MissingParamError('field'))
    })
})