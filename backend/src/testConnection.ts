import { MongoClient } from 'mongodb';

const uri = 'mongodb://127.0.0.1:27017'; // Update if using MongoDB Atlas
const client = new MongoClient(uri);

const testConnection = async () => {
    try {
        await client.connect();
        console.log('Connected to MongoDB!');
        const db = client.db('LockedIn');
        console.log('Collections:', await db.listCollections().toArray());
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    } finally {
        await client.close();
    }
};

testConnection();