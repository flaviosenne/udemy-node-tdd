import MongoHelper from '../../../../infra/db/mongodb/helpers/mongo-helper'
import { AccountMongoRepository } from './account'
describe('Account Mongo Repository', ()=>{
  
    const makeSut = ():AccountMongoRepository => {
        return new AccountMongoRepository()
    }
    beforeAll(async()=>{
        await MongoHelper.connect('mongodb://localhost:27017/jest')
    })
    afterAll(async()=> {
        await MongoHelper.disconnect()
    })
    beforeEach(async()=>{
        const accountCollection = await MongoHelper.getCollection('accounts')
        await accountCollection.deleteMany()
    })
    it('should return an account on success', async()=>{
        const sut = makeSut()
        const account = sut.add({
            name:'valid_name',
            email:'valid_email@mail.com',
            password:'valid_password'
        })
        
        expect(account).toBeTruthy()
        // expect(account.id).toBeTruthy()
        // expect(account.name).toBe('valid_name')
        // expect(account.email).toBe('valid_email@mail.com')
        // expect(account.password).toBe('valid_password')
    })
})
