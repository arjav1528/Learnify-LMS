import { MongoClient, ServerApiVersion } from "mongodb";



const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

const client = new MongoClient(MONGODB_URI, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }

});


const connectToDatabase = async () => {
    try{
        await client.connect();
        await client.db().command({ ping: 1 });

        return client;
    } catch (error) {
        console.error('Error connecting to the database:', error);
        throw error;
    }
}


export { connectToDatabase }