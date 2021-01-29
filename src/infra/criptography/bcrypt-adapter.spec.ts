import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adapter'

jest.mock('bcrypt', () => ({
    async hash(): Promise<string> {
        return new Promise(resolve => resolve('hash'))
    }
}))

const salt = 12
const makeSut = (): BcryptAdapter => {
    return new BcryptAdapter(salt)
}
describe('Bcrypt Adapter', () => {
    it('Should call bcrypt with correct password', async () => {
       
        const sut = makeSut()
        const hashSpy = jest.spyOn(bcrypt, 'hash')
        await sut.encrypt('correct_password')
        expect(hashSpy).toHaveBeenCalledWith('correct_password', salt)
    })
    it('Should return a hash on success', async () => {
    
        const sut = makeSut()
        const hash = await sut.encrypt('correct_password')
        expect(hash).toBe('hash')
    })
    it('Should return throw if bcript throws', async () => {
    
        const sut = makeSut()
        jest.spyOn(bcrypt, 'hash').mockRejectedValueOnce(new Promise((resolve, reject) => reject(new Error)))
        const promise = sut.encrypt('correct_password')
        expect(promise).rejects.toThrow()
    })
})