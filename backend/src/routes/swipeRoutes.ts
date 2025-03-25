import express from 'express';

const router = express.Router();

// Mock data
interface Swipe {
  fromUser: string;
  toUser: string;
  direction: 'left' | 'right';
}

interface Connection {
  users: [string, string];
}

const swipes: Swipe[] = [];
const connections: Connection[] = [];

router.post('/', (req, res) => {
  const { fromUser, toUser, direction } = req.body;
  swipes.push({ fromUser, toUser, direction });
  res.status(201).json({ message: 'Swipe recorded', swipe: { fromUser, toUser, direction } });

  // Automatically create a connection if both users swipe right
  if (direction === 'right') {
    const match = swipes.find(
      (swipe) => swipe.fromUser === toUser && swipe.toUser === fromUser && swipe.direction === 'right'
    );
    if (match) {
      connections.push({ users: [fromUser, toUser] });
      console.log(`Connection created between ${fromUser} and ${toUser}`);
    }
  }
});

router.get('/connections', (req, res) => {
  res.json(connections);
});

export default router;