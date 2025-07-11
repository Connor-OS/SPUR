import Queue from 'bull';
import dotenv from 'dotenv';
dotenv.config();

export const emailQueue = new Queue('emailQueue', {
  redis: {
    host: process.env.REDIS_HOST || 'localhost',
    port: Number(process.env.REDIS_PORT) || 6379,
  },
});
