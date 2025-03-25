import { Request, Response } from 'express';

const users = [
  {
    _id: '1',
    name: 'Alice Johnson',
    interests: ['Technology', 'Networking'],
  },
  {
    _id: '2',
    name: 'Bob Smith',
    interests: ['Startups', 'Investing'],
  },
  {
    _id: '3',
    name: 'Charlie Brown',
    interests: ['Design', 'Marketing'],
  },
];

export const getRecommendations = (req: Request, res: Response) => {
  const userId = req.params.userId;

  const user = users.find((u) => u._id === userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const recommendations = users.filter((u) => u._id !== userId);
  res.json(recommendations);
};