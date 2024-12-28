import dotenv from 'dotenv';

dotenv.config();

export const env = {
    MONGO_URI: process.env.MONGO_URI || '',
    PORT: process.env.PORT || '5000',
    GITHUB_API_KEY: process.env.GITHUB_API_KEY || '',
};

if (!env.MONGO_URI) {
    console.error('Error: MONGO_URI is not defined in the .env file');
    process.exit(1); // Exit the application if critical env vars are missing
}
