import express, { Router, Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { connectDB } from '../db';

// Define the structure of req.params for routes with :chatId
interface ChatParams {
  chatId: string;
}

// Define the structure of req.body for POST /:chatId/messages
interface MessageBody {
  sender: string;
  text: string;
}

const router: Router = express.Router();

// Get all chats
router.get('/', async (req: Request, res: Response) => {
  console.log('GET /chats called');
  try {
    const db = await connectDB();
    const chats = await db.collection('chats').find().toArray(); // Fetch chats from MongoDB
    console.log('Chats fetched from database:', chats);
    res.json(chats);
  } catch (error) {
    console.error('Error fetching chats from database:', error);
    res.status(500).json({ message: 'Error fetching chats' });
  }
});

// Get messages for a specific chat
router.get('/:chatId/messages', async (req, res) => {
  const { chatId } = req.params;
  console.log(`GET /chats/${chatId}/messages called`);

  try {
    const db = await connectDB();
    const messages = await db
      .collection('messages')
      .find({ chatId: new ObjectId(chatId) }) // Query messages by chatId
      .toArray();
    console.log('Messages fetched:', messages);
    res.json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ message: 'Error fetching messages' });
  }
});

// Send a new message
router.post('/:chatId/messages', (req, res) => {
  const { chatId } = req.params;
  const { sender, text } = req.body;
  console.log(`POST /chats/${chatId}/messages called with:`, { sender, text });

  const dummyMessage = {
    _id: '3',
    chatId,
    sender,
    text,
    timestamp: new Date(),
  };

  res.status(201).json(dummyMessage);
});

export default router;
