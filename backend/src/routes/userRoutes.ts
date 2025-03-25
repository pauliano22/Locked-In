import express from 'express';

const router = express.Router();

// Mock data
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

router.get('/', (req, res) => {
  res.json(users);
});

export default router;