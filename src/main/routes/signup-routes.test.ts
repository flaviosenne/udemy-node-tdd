import request from 'supertest'
import app from '../config/app'

describe('Signup Routes', ()=> {
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