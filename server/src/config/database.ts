import mongoose from 'mongoose';
import { env } from './env';

export const connectToDatabase = async (): Promise<void> => {
    try {
        await mongoose.connect(env.MONGO_URI, {});
        console.log('Database connection established successfully');
    } catch (error) {
        console.error('Error connecting to the database:', (error as Error).message);
        process.exit(1);
    }
};
