import { MongoClient } from 'mongodb';

let dbConnection;

export const connectToDb = async (cb) => {
    try {
        const client = await MongoClient.connect(process.env.MONGODB_URI);
        dbConnection = client.db();
        cb();
    } catch (err) {
        console.log(err);
        cb(err);
    }
};

export const getDb = async () => {
    return await dbConnection;
};
