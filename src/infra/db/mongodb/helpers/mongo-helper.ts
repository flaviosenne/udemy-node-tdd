
import mongo from "mongoose"

export class MongoHelper {
   
    async connect(url: string): Promise<void> {
        mongo.connect(url, { useNewUrlParser: true })
    }
    async disconnect(): Promise<void> {
        mongo.disconnect()
    }

    getCollection(name: string): any {

        return mongo.model(name, new mongo.Schema({
            name: String,
            email: String,
            password: String,
        }))


    }
    map(collection: any): any {

        const { _id, ...collectiontWhitoutId } = collection

        return Object.assign({}, collectiontWhitoutId, { id: _id })
    }

}