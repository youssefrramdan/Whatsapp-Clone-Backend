import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import globalError from './middlewares/errorMiddleware.js';
import ApiError from './utils/apiError.js';

dotenv.config({ path: './config/config.env' });
const app = express();

const corsOption = {
  origin: true,
  credentials: true,
  optionsSuccessStatus: 200,
};

// middlewares
app.use(cors(corsOption));
app.use(express.json());
app.use(cookieParser());
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
  console.log(`mode : ${process.env.NODE_ENV}`);
}

// mount Routes

app.get('/ping', (req, res, next) => {
  res.status(200).json({
    message: 'pong',
  });
});

app.all(/(.*)/, (req, res, next) => {
  next(new ApiError(`Can't find ${req.originalUrl} on this server!`, 400));
});

app.use(globalError);

export default app;
