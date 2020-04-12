import path from "path";
require('dotenv').config({ path: path.join(process.cwd(), '.env') })
import mongo from "mongodb";
const MongoClient = mongo.MongoClient;

export default async () => {
    const connection = process.env.CONNECTION || ""
    const client = new MongoClient(connection, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect()
    return client;
}
