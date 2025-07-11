try {
  require('../workers/emailQueueWorker');
  console.log('📧 Email workers started');
} catch (err) {
  console.error('❌ Worker failed to start:', err);
}