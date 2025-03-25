import express, { Express, Request, Response } from 'express';
import cors from 'cors';

const app: Express = express();

app.use(cors());
app.use(express.json());

// Mock data
interface Swipe {
  fromUser: string;
  toUser: string;
  direction: 'left' | 'right';
}

interface Connection {
  users: [string, string];
}

const users = [
  {
    _id: '1',
    name: 'Alice Johnson',
    email: 'alice@example.com',
    interests: ['Technology', 'Networking'],
    profilePic: 'https://via.placeholder.com/300',
  },
  {
    _id: '2',
    name: 'Bob Smith',
    email: 'bob@example.com',
    interests: ['Startups', 'Investing'],
    profilePic: 'https://via.placeholder.com/300',
  },
  {
    _id: '3',
    name: 'Charlie Brown',
    email: 'charlie@example.com',
    interests: ['Design', 'Marketing'],
    profilePic: 'https://via.placeholder.com/300',
  },
];

const swipes: Swipe[] = [];
const connections: Connection[] = [];

// Routes
app.get('/', (req: Request, res: Response) => {
  res.send('TypeScript + Express Server');
});

app.get('/users', (req: Request, res: Response) => {
  res.json(users);
});

app.post('/swipes', (req: Request, res: Response) => {
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

app.get('/connections', (req: Request, res: Response) => {
  res.json(connections);
});

export default app;