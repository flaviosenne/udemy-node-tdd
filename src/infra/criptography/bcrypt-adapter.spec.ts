import bcrypt from 'bcrypt'
import { BcryptAdapter } from './bcrypt-adapter'

jest.mock('bcrypt', () => ({
    async hash(): Promise<string> {
        return new Promise(resolve => resolve('hash'))
    }
}))

describe('Bcrypt Adapter', () => {
    it('Should call bcrypt with correct password', async () => {
        const salt = 12
        const sut = new BcryptAdapter(salt)
        const hashSpy = jest.spyOn(bcrypt, 'hash')
        await sut.encrypt('correct_password')
        expect(hashSpy).toHaveBeenCalledWith('correct_password', salt)
    })
    it('Should return a hash on success', async () => {
        const salt = 12
        const sut = new BcryptAdapter(salt)
        const hash = await sut.encrypt('correct_password')
        expect(hash).toBe('hash')
    })
})