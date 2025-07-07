import nodemailer from 'nodemailer';
import pug from 'pug';
import path from 'path';
import { emailQueue } from '../queues/redis';
import { EmailJob } from '../types/email';

class EmailService {
  private readonly transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  public async sendEmail(to: string, subject: string, template: string, context: any) {
    const job: EmailJob = { to, subject, template, context };
    await emailQueue.add(job, {
      attempts: 5,
      backoff: 60000,
      removeOnComplete: true,
      removeOnFail: false,
    });
  }

  public async processEmailJob(job: EmailJob): Promise<void> {
    try {
      const templatePath = path.join(__dirname, '../emailTemplates', `${job.template}.pug`);
      const html = pug.renderFile(templatePath, job.context);

      await this.transporter.sendMail({
        from: process.env.FROM_EMAIL,
        to: job.to,
        subject: job.subject,
        html,
      });

      console.log(`Email sent to ${job.to}`);
    } catch (error) {
      console.error(`Error sending email to ${job.to}:`, error);
      throw error;
    }
  }
}

export default new EmailService();
