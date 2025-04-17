import mongoose from 'mongoose';
import logger from './logger.config.js';

const databaseConnection = async () => {
  mongoose
    .connect(process.env.DB_URI)
    .then(conn => {
      logger.info(`Database connected successfully : ${conn.connection.host}`);
    })
    .catch(err => {
        logger.error(`Database Error : ${err}`);
    });
};

export default databaseConnection;
