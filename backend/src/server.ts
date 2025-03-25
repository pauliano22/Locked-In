import app from './app'; // Ensure the relative path is correct
import { connectDB } from './db';

const PORT = process.env.PORT || 3000;

(async () => {
    const db = await connectDB();
    console.log('Connected to MongoDB:', db.databaseName);
})();

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});