import nodemailer from 'nodemailer';
import pug from 'pug';
import { emailQueue } from '../../queues/redis';
import path from 'path';

jest.mock('nodemailer');
jest.mock('../../queues/redis');
jest.mock('pug');

const mockSendMail = jest.fn();
(nodemailer.createTransport as jest.Mock).mockReturnValue({ sendMail: mockSendMail });

import EmailService from '../../services/email.service';

describe('EmailService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('sendEmail', () => {
    it('should add a job to the queue with correct data', async () => {
      const addMock = jest.fn();
      (emailQueue.add as unknown as jest.Mock).mockImplementation(addMock);

      await EmailService.sendEmail('user@example.com', 'Test Subject', 'welcome', {
        name: 'Test User',
      });

      expect(addMock).toHaveBeenCalledWith(
        {
          to: 'user@example.com',
          subject: 'Test Subject',
          template: 'welcome',
          context: { name: 'Test User' },
        },
        expect.objectContaining({
          attempts: 5,
          backoff: 60000,
        })
      );
    });
  });

  describe('processEmailJob', () => {
    it('should render pug template and send workers', async () => {
      const mockHtml = '<h1>Hello Test User</h1>';
      (pug.renderFile as jest.Mock).mockReturnValue(mockHtml);

      const job = {
        to: 'user@example.com',
        subject: 'Hello',
        template: 'welcome',
        context: { name: 'Test User' },
      };

      await EmailService.processEmailJob(job);

      expect(pug.renderFile).toHaveBeenCalledWith(
        path.join(__dirname, '../../emailTemplates/welcome.pug'),
        job.context
      );
      expect(mockSendMail).toHaveBeenCalledWith({
        from: process.env.FROM_EMAIL,
        to: 'user@example.com',
        subject: 'Hello',
        html: mockHtml,
      });
    });

    it('should throw error if sending fails', async () => {
      const job = {
        to: 'fail@example.com',
        subject: 'Should Fail',
        template: 'welcome',
        context: {},
      };

      (pug.renderFile as jest.Mock).mockReturnValue('<h1>Test</h1>');
      mockSendMail.mockRejectedValue(new Error('SMTP Error'));

      await expect(EmailService.processEmailJob(job)).rejects.toThrow('SMTP Error');
    });
  });
});
