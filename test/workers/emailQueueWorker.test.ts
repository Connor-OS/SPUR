jest.mock('../../services/email.service');
jest.mock('../../queues/redis');

import '../../workers/emailQueueWorker';
import { emailQueue } from '../../queues/redis';
import EmailService from '../../services/email.service';

describe('emailQueueWorker', () => {
  it('should register a processor that calls EmailService.processEmailJob', async () => {
    const fakeJob = { id: '1', data: { to: 'test@example.com' } };
    const processHandler = (emailQueue.process as jest.Mock).mock.calls[0][0];

    await processHandler(fakeJob);

    expect(EmailService.processEmailJob).toHaveBeenCalledWith(fakeJob.data);
  });

  it('should handle errors in job processing', async () => {
    const fakeJob = { id: '2', data: { to: 'fail@example.com' } };
    const error = new Error('Processing failed');
    (EmailService.processEmailJob as jest.Mock).mockRejectedValueOnce(error);

    const processHandler = (emailQueue.process as jest.Mock).mock.calls[0][0];

    await expect(processHandler(fakeJob)).rejects.toThrow('Processing failed');
  });
});
