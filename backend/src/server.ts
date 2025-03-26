console.log('Starting server...');
import app from './app'; // Ensure the relative path is correct
console.log('App imported successfully');
import { connectDB } from './db';

const PORT = parseInt(process.env.PORT || '3000', 10);

(async () => {
    const db = await connectDB();
    console.log('Connected to MongoDB:', db.databaseName);
})();

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});