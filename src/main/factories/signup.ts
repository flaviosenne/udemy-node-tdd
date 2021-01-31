import {SignUpController} from '../../presentation/controllers/signup/Signup'
import {EmailValidatorAdapter} from '../../utils/email-validator-adapter'
import {DbAddAccount} from '../../data/usecases/add-account/db-add-account'
import {BcryptAdapter}from '../../infra/criptography/bcrypt-adapter'
import {AccountMongoRepository} from '../../infra/db/mongodb/account-repository/account'
export const makeSignUpController = (): SignUpController => {
    const salt = 12
    const bcryptAdapter = new BcryptAdapter(salt)
    const emailValidatorAdpater = new EmailValidatorAdapter()
    const accountMongoRepository = new AccountMongoRepository()
    const dbAddAccount = new DbAddAccount(bcryptAdapter, accountMongoRepository)
    
    return new SignUpController(emailValidatorAdpater, dbAddAccount)
    
}