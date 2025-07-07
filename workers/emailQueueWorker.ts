import { emailQueue } from '../queues/redis';
import EmailService from '../services/email.service';
import { EmailJob } from '../types/email';

emailQueue.process(async (job) => {
  const data = job.data as EmailJob;
  await EmailService.processEmailJob(data);
});

emailQueue.on('failed', (job, err) => {
  console.error(`Job failed for ${job.data.to}:`, err);
});

emailQueue.on('completed', (job) => {
  console.log(`Job completed for ${job.data.to}`);
});
