import MongoHelper  from './../../infra/db/mongodb/helpers/mongo-helper';
import request from 'supertest'
import app from '../config/app'

describe('Signup Routes', ()=> {
    beforeAll(async () => {
        await MongoHelper.connect('mongodb+srv://jest:jest@jest.zooie.mongodb.net/jest?retryWrites=true&w=majority')
    })
    afterAll(async () => {
        await MongoHelper.disconnect()
    })

    it('Should return an account on success', async()=> {
        await request(app)
        .post('/api/signup')
        .send({
            name: 'joao',
            email: 'joao@email.com',
            password: '1234',
            passwordConfirmation: '1234',
        })
        .expect(200)
    })
})