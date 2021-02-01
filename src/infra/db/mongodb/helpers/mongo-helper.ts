
import mongoose from "mongoose"

class MongoHelper {
    uri: string
    constructor() {

    }
    async connect(url: string): Promise<void> {
        this.uri = url
        mongoose.connect(url,
            { useNewUrlParser: true, useUnifiedTopology: true })

        mongoose.connection.on('connected', () =>
            console.log(`Mongoose! conectado `)
        )
    }
    async disconnect(): Promise<void> {
        mongoose.disconnect()
    }

    async getCollection(collection: string): Promise<any> {
        await this.connect(this.uri)
        return mongoose.model(collection, new mongoose.Schema({
            name: String,
            email: String,
            password: String,
        }))
    }
    map(collection: any): any {

        const { _id, ...collectiontWhitoutId } = collection

        Object.assign({}, collectiontWhitoutId, { id: _id })
        const {id, name, email, password} = collectiontWhitoutId
        return {id, name, email, password}
    }
}
export default new MongoHelper()