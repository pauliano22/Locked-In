import express from 'express';
import { connectDB } from '../db';

const router = express.Router();

// Get all users
router.get('/', async (req, res) => {
    try {
        const db = await connectDB();
        const users = await db.collection('users').find().toArray();
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Error fetching users' });
    }
});

export default router;