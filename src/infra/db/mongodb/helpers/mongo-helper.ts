
import mongoose from "mongoose"

class MongoHelper {
    constructor() {

    } 
    async connect(url: string): Promise<void> {
        mongoose.connect(url, { useNewUrlParser: true })
    }
    async disconnect(): Promise<void> {
        mongoose.disconnect()
    }

    getCollection(collection: string): any {

        return mongoose.model(collection, new mongoose.Schema({
            name: String,
            email: String,
            password: String,
        }))


    }
    // map(collection: any): any {

    //     const { _id, ...collectiontWhitoutId } = collection

    //     return Object.assign({}, collectiontWhitoutId, { id: _id })
    // }
}
export default new MongoHelper()