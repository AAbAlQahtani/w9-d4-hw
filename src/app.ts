// index.ts
import express, { Express, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import logger from './utils/logger';
import { dev, port } from './utils/helpers';
import dealerRoutes from './routes/dealer.routes';
import carMakeRoutes from './routes/carmake.routes';
import carRoutes from './routes/car.routes';
import { OK, INTERNAL_SERVER_ERROR } from './utils/http-status';
import { connectDB, deleteAllCollections } from './config/database';

// Load environment variables
dotenv.config();

// Optional: Delete all collections (use only in dev/testing)
if (dev) {
  deleteAllCollections();
}

// Connect to MongoDB
connectDB();

const app: Express = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(morgan('tiny', {
  stream: {
    write: (message) => logger.info(message.trim())
  }
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/dealers', dealerRoutes);
app.use('/api/carmakes', carMakeRoutes);
app.use('/api/cars', carRoutes);

// Basic route
app.get('/', (req: Request, res: Response) => {
  res.status(OK).json({ message: 'Car System API - Welcome!' });
});

// Error handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  logger.error('Error:', err.message);
  res.status(INTERNAL_SERVER_ERROR).json({
    success: false,
    message: 'Something went wrong!',
    error: dev ? err.message : undefined
  });
});

// Start server
app.listen(port, () => {
  logger.info(`Server is running on port ${port}`);
});
