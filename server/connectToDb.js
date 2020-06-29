import mongoose from "mongoose";
import config from "config";

export default async function connectToDb() {
    const scheme = config.get("db.scheme");
    const host = config.get("db.host");
    const port = config.get("db.port");
    const collection = config.get("db.collection");

    try {
        await mongoose.connect(`${scheme}://${host}:${port}/${collection}`, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log(`Connected to ${scheme} database on ${host}:${port}`);
    } catch (error) {
        throw error;
    }
}
