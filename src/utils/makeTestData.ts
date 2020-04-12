import path from "path";
require('dotenv').config({ path: path.join(process.cwd(), '.env') })
import * as mongo from "mongodb";
import { bryptAsync } from "./bcrypt-async-helper"
const MongoClient = mongo.MongoClient;

const uri = process.env.CONNECTION || ""

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });



(async function makeTestData() {
    try {
        await client.connect();
        const db = client.db(process.env.DB_NAME)
        const usersCollection = db.collection("users")
        await usersCollection.deleteMany({})
        const secretHashed = await bryptAsync("secret");
        const status = await usersCollection.insertMany([
            { name: "Peter Pan", userName: "pp@b.dk", password: secretHashed, role: "user" },
            { name: "Donald Duck", userName: "dd@b.dk", password: secretHashed, role: "user" },
            { name: "admin", userName: "admin@a.dk", password: secretHashed, role: "admin" }
        ])
        console.log(`Inserted ${status.insertedCount} test users`)
        console.log(`NEVER, NEVER, NEVER run this on a production database`)

    } catch (err) {
        console.error(err)
    } finally {
        client.close();
    }
})()