import {MongoHelper}from '../helpers/mongo-helper'
import { AccountMongoRepository } from './account'
describe('Account Mongo Repository', ()=>{
    
    beforeAll(async () => {
       await MongoHelper.connect('mongodb+srv://jest:jest@jest.zooie.mongodb.net/jest?retryWrites=true&w=majority')
    })
    afterAll(async() => {
        await MongoHelper.disconnect()
    })
    
    it('should return an account on success', async ()=>{
        const sut = new AccountMongoRepository()
        const account = await sut.add({
            name:'valid_name',
            email:'valid_email@mail.com',
            password:'valid_password'
        })
        
        expect(account).toBeTruthy()
        expect(account.id).toBeTruthy()
        expect(account.name).toBe('valid_name')
        expect(account.email).toBe('valid_email@mail.com')
        expect(account.password).toBe('valid_password')
    })
})