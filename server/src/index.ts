// server\src\index.ts

import express from 'express';
import { connectToDatabase } from './config/database';
import { env } from './config/env';
import userRoutes from './routes/userRoutes';

const app = express();

app.use(express.json());

app.use('/api', userRoutes);

connectToDatabase().then(() => {
  app.listen(env.PORT, () => {
    console.log(`Server is running on port ${env.PORT}`);
  });
});

app.get('/', (req, res) => {
  res.send('API is running...');
});
