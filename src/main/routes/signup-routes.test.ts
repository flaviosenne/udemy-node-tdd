import MongoHelper  from './../../infra/db/mongodb/helpers/mongo-helper';
import request from 'supertest'
import app from '../config/app'

describe('Signup Routes', ()=> {
    beforeAll(async () => {
        await MongoHelper.connect('mongodb://localhost:27017/jest')
    })
    afterAll(async () => {
        await MongoHelper.disconnect()
    })

    it('Should return an account on success', async()=> {
        const result = await request(app)
        .post('/api/signup')
        .send({
            name: 'joao flavio',
            email: 'joao@email.com',
            password: 'joao',
            passwordConfirmation: 'joao',
        })

        expect(result.status).toEqual(200)
       
    })
})