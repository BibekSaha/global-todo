import express from 'express';
import { CustomError } from './errors/CustomError.js';

const app = express();

app.use(express.json());

app.use((err, _req, res, _next) => {
  if (err instanceof CustomError) {
    const status = parseInt(err.statusCode / 100) == 4 ?
      'error' : 'fail';
    return res.staus(err.statusCode).json({
      status,
      message: err.message
    });
  }
  return res.status(500).json({
    status: 'fail',
    message: 'INTERNAL SERVER ERROR'
  });
});

app.all('*', (_req, res) => {
  return res.status(404).json({
    status: 'error',
    message: '404 - Not Found'
  });
});

export default app;