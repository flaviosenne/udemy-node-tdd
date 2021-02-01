import { Controller } from './../../presentation/protocols/controller';
import {SignUpController} from '../../presentation/controllers/signup/Signup'
import {EmailValidatorAdapter} from '../../utils/email-validator-adapter'
import {DbAddAccount} from '../../data/usecases/add-account/db-add-account'
import {BcryptAdapter}from '../../infra/criptography/bcrypt-adapter'
import {AccountMongoRepository} from '../../infra/db/mongodb/account-repository/account'
import { LogControllerDecorator } from '../decorators/log';
import { LogMongoRepository } from '../../infra/db/mongodb/log-repository/log';

export const makeSignUpController = (): Controller => {
    const salt = 12
    const bcryptAdapter = new BcryptAdapter(salt)
    const emailValidatorAdpater = new EmailValidatorAdapter()
    const accountMongoRepository = new AccountMongoRepository()
    const dbAddAccount = new DbAddAccount(bcryptAdapter, accountMongoRepository)
    
    const signUpController = new SignUpController(emailValidatorAdpater, dbAddAccount)
    const logMongoRepository = new LogMongoRepository()
    return new LogControllerDecorator(signUpController, logMongoRepository)
    
}