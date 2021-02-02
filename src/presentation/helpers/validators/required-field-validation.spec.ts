import { MissingParamError } from './../../errors/missing-param-error';
import { RequiredFielfValidation } from './required-field-validation';
const makeSut = (): RequiredFielfValidation => {
    return new RequiredFielfValidation('field')
}
describe('RequiredField Validation',() => {
    it('Should return a MissingParamError if validation fails',()=>{
        const sut =makeSut()
        const error = sut.validate({ name: 'any_name'})
        expect(error).toEqual(new MissingParamError('field'))
    })
    it('Should not return if validation succeeds',()=>{
        const sut = makeSut()
        const error = sut.validate({ name: 'any_name'})
        expect(error).toBeFalsy()
    })
})