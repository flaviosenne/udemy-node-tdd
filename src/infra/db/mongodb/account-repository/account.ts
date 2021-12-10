import { AddAccountRepository } from "../../../../data/protocols/add-account-repository";
import { AccountModel } from "../../../../domain/models/account";
import { AddAccountModel } from "../../../../domain/usecases/add-account";
import { MongoHelper } from '../helper/mongo-hellper'

export class AccountMongoRepository implements AddAccountRepository {
    async add(accountData: AddAccountModel): Promise<AccountModel>{
        const accountCollection = MongoHelper.getCollection('accounts')
        const result = await accountCollection.insertOne(accountData)
        
        return new Promise(resolve => resolve(null))

    }
}