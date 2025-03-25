import express from 'express';
import { connectDB } from '../db';
import { ObjectId } from 'mongodb';

const router = express.Router();

// Get all chats
router.get('/', async (req, res) => {
    console.log('GET /chats called'); // Debugging log
    try {
        const db = await connectDB();
        const chats = await db.collection('chats').find().toArray();
        console.log('Chats fetched:', chats); // Debugging log
        res.json(chats);
    } catch (error) {
        console.error('Error fetching chats:', error);
        res.status(500).json({ message: 'Error fetching chats' });
    }
});

// Get messages for a specific chat
router.get('/:chatId/messages', async (req, res) => {
    const { chatId } = req.params;
    console.log('GET /chats/:chatId/messages called with chatId:', chatId); // Debugging log

    try {
        if (!ObjectId.isValid(chatId)) {
            console.error('Invalid chatId:', chatId); // Debugging log
            return res.status(400).json({ message: 'Invalid chatId' });
        }

        const db = await connectDB();
        const messages = await db
            .collection('messages')
            .find({ chatId: new ObjectId(chatId) })
            .toArray();
        console.log('Messages fetched:', messages); // Debugging log
        res.json(messages);
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ message: 'Error fetching messages' });
    }
});

// Send a new message
router.post('/:chatId/messages', async (req, res) => {
    const { chatId } = req.params;
    const { sender, text } = req.body;
    console.log('POST /chats/:chatId/messages called with:', { chatId, sender, text }); // Debugging log

    if (!sender || !text) {
        console.error('Missing sender or text:', { sender, text }); // Debugging log
        return res.status(400).json({ message: 'Sender and text are required' });
    }

    try {
        if (!ObjectId.isValid(chatId)) {
            console.error('Invalid chatId:', chatId); // Debugging log
            return res.status(400).json({ message: 'Invalid chatId' });
        }
        if (!ObjectId.isValid(sender)) {
            console.error('Invalid sender:', sender); // Debugging log
            return res.status(400).json({ message: 'Invalid sender' });
        }

        const db = await connectDB();
        const newMessage = {
            chatId: new ObjectId(chatId),
            sender: new ObjectId(sender),
            text,
            timestamp: new Date(),
        };
        const result = await db.collection('messages').insertOne(newMessage);
        console.log('Message inserted:', result); // Debugging log
        res.status(201).json({ ...newMessage, _id: result.insertedId });
    } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).json({ message: 'Error sending message' });
    }
});

export default router;