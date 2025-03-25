import { connectDB } from './db';
import { ObjectId } from 'mongodb';

const seedDatabase = async () => {
    const db = await connectDB();

    // Clear existing data
    await db.collection('users').deleteMany({});
    await db.collection('chats').deleteMany({});
    await db.collection('messages').deleteMany({});
    console.log('Cleared existing data.');

    // Seed users
    const users = [
        { _id: new ObjectId(), name: 'Alice Johnson', email: 'alice@example.com', profilePic: 'https://via.placeholder.com/300', interests: ['Technology', 'Networking'] },
        { _id: new ObjectId(), name: 'Bob Smith', email: 'bob@example.com', profilePic: 'https://via.placeholder.com/300', interests: ['Startups', 'Investing'] },
        { _id: new ObjectId(), name: 'Charlie Brown', email: 'charlie@example.com', profilePic: 'https://via.placeholder.com/300', interests: ['Design', 'Marketing'] },
    ];
    const userResult = await db.collection('users').insertMany(users);
    console.log('Inserted users:', userResult.insertedCount);

    // Seed chats
    const chats = [
        { _id: new ObjectId(), name: 'Alice and Bob', participants: [users[0]._id, users[1]._id] },
        { _id: new ObjectId(), name: 'Alice and Charlie', participants: [users[0]._id, users[2]._id] },
    ];
    const chatResult = await db.collection('chats').insertMany(chats);
    console.log('Inserted chats:', chatResult.insertedCount);

    // Seed messages
    const messages = [
        { chatId: chats[0]._id, sender: users[0]._id, text: 'Hi Bob!', timestamp: new Date() },
        { chatId: chats[0]._id, sender: users[1]._id, text: 'Hello Alice!', timestamp: new Date() },
        { chatId: chats[1]._id, sender: users[0]._id, text: 'Hi Charlie!', timestamp: new Date() },
    ];
    const messageResult = await db.collection('messages').insertMany(messages);
    console.log('Inserted messages:', messageResult.insertedCount);

    console.log('Database seeded!');
    process.exit();
};

seedDatabase().catch((err) => {
    console.error('Error seeding database:', err);
    process.exit(1);
});