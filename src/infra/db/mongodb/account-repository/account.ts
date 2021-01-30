import {AddAccountRepository} from '../../../../data/protocols/add-account-repository'
import { AccountModel } from '../../../../domain/models/account';
import { AddAccountModel } from '../../../../domain/usecases/add-account';
import {MongoHelper,}from '../helpers/mongo-helper'

export class AccountMongoRepository implements AddAccountRepository {
    async add(accountData: AddAccountModel): Promise<AccountModel>{
       return {
        id:'valid_id',
        name:'valid_name',
        email:'valid_email@mail.com',
        password:'valid_password'
       }
    }
}