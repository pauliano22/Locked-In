import express from 'express';

const router = express.Router();

// Mock data
interface Message {
  id: string;
  chatId: string;
  sender: string;
  text: string;
  timestamp: string;
}

interface Chat {
  id: string;
  name: string;
  participants: string[];
}

const chats: Chat[] = [
  { id: '1', name: 'Alice Johnson', participants: ['1', '2'] },
  { id: '2', name: 'Bob Smith', participants: ['1', '3'] },
];

const messages: Message[] = [
  { id: '1', chatId: '1', sender: '1', text: 'Hi Alice!', timestamp: new Date().toISOString() },
  { id: '2', chatId: '1', sender: '2', text: 'Hello!', timestamp: new Date().toISOString() },
  { id: '3', chatId: '2', sender: '1', text: 'Hey Bob!', timestamp: new Date().toISOString() },
];

// Get all chats
router.get('/', (req, res) => {
  res.json(chats);
});

// Get messages for a specific chat
router.get('/:chatId/messages', (req, res) => {
  const { chatId } = req.params;
  const chatMessages = messages.filter((message) => message.chatId === chatId);
  res.json(chatMessages);
});

// Send a new message
router.post('/:chatId/messages', (req, res) => {
  const { chatId } = req.params;
  const { sender, text } = req.body;

  if (!sender || !text) {
    return res.status(400).json({ message: 'Sender and text are required' });
  }

  const newMessage: Message = {
    id: (messages.length + 1).toString(),
    chatId,
    sender,
    text,
    timestamp: new Date().toISOString(),
  };

  messages.push(newMessage);
  res.status(201).json(newMessage);
});

export default router;