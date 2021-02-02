import { MissingParamError } from './../../errors/missing-param-error';
import { Validation } from './validation';
import { ValidationComposite } from './validation-composite';
describe('Validation Composite', ()=> {
    it('Should return an error if any validation fails', ()=> {
        class ValidationStub implements Validation {
            validate(input: any): Error {
                return new MissingParamError('feild')
            }
        }
        const validationStub = new ValidationStub()
        const sut = new ValidationComposite([])
        const error = sut.validate({field: 'any_value'})
        expect(error).toEqual(new MissingParamError('feild'))
    })
})