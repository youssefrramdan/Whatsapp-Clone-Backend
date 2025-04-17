import app from './app.js';
import databaseConnection from './config/dbConnection.js';
import logger from './config/logger.config.js';

databaseConnection();

const PORT = process.env.PORT || 8000;

const server = app.listen(PORT, () => {
  logger.info(`server is running ${PORT} ....`);
});

const exitHandler = () => {
  if (server) {
    logger.info('Server Closed .');
    process.exit(1);
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = error => {
  logger.error(error);
  exitHandler();
};
// Handle errors that occur within promises but weren't caught
process.on('unhandledRejection', unexpectedErrorHandler);

// Handle errors that happen synchronously outside Express
process.on('uncaughtException', unexpectedErrorHandler);
