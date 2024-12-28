import express from 'express';
import { connectToDatabase } from './config/database';
import { env } from './config/env';

const app = express();

app.use(express.json());

// Connect to the database
connectToDatabase().then(() => {
  app.listen(env.PORT, () => {
    console.log(`Server is running on port ${env.PORT}`);
  });
});

// Define a simple route
app.get('/', (req, res) => {
  res.send('API is running...');
});
