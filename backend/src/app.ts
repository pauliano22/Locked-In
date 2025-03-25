import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import chatRoutes from './routes/chatRoutes';
import userRoutes from './routes/userRoutes';

const app: Express = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/users', userRoutes); // Register user routes
app.use('/chats', chatRoutes); // Register chat routes

app.get('/', (req: Request, res: Response) => {
  res.send('TypeScript + Express Server');
});

export default app;