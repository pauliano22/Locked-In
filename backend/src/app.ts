import express, { Express, Request, Response } from 'express';
import cors from 'cors';
import chatRoutes from './routes/chatRoutes';

const app: Express = express();

app.use(cors());
app.use(express.json());

// Register chat routes
app.use('/chats', chatRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('TypeScript + Express Server');
});

export default app;