import { Collection, MongoClient } from "mongodb"

export const MongoHelper = {
    client: null as MongoClient,
    db: null as MongoClient,
    async connect(url: string): Promise<void>{
        this.client = await MongoClient.connect(url, {
            useNewUrlParser: true
        })
        this.db = await this.client.db('jest')
    },
    async disconnect(): Promise<void>{
        await this.client.close()
        await this.db.close()
    },

    getCollection(name: string): Collection{
        return this.db.collection(name)
    }
}