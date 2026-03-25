const eventBus = require('../utils/eventBus');
const EVENTS = require('../utils/events');
const logger = require('../utils/logger');

eventBus.on(EVENTS.EMAIL_QUEUED, (data) => {
  logger.info(`📥 Email queued | Job: ${data.jobId}`);
});

eventBus.on(EVENTS.EMAIL_PROCESSING, (data) => {
  logger.info(`⚙️ Processing email | Job: ${data.jobId}`);
});

eventBus.on(EVENTS.EMAIL_SENT, (data) => {
  logger.info(`✅ Email sent | Job: ${data.jobId}`);
});

eventBus.on(EVENTS.EMAIL_FAILED, (data) => {
  logger.error(`❌ Email failed | Job: ${data.jobId} | Error: ${data.error}`);
});