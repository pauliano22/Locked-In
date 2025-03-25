import { MongoClient, Db } from "mongodb";

// MongoDB URI
const uri = "mongodb://127.0.0.1:27017"; // MongoDB is running locally
const client = new MongoClient(uri);

// Database connection function
export const connectDB = async (): Promise<Db> => {
    try {
        await client.connect();
        console.log("Connected to MongoDB!");
        return client.db("LockedIn"); // Replace with your DB name
    } catch (err) {
        console.error("MongoDB connection error:", err);
        throw err; // Rethrow the error if connection fails
    }
};

// Export the client for reuse
export { client };
