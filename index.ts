import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import { appRouter } from './routers';
import { createContext } from './context';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" },
}));

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}));

app.use(morgan('dev'));
app.use(express.json({ limit: '10mb' }));

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

app.use('/api/trpc', createExpressMiddleware({
  router: appRouter,
  createContext,
}));

app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    error: process.env.NODE_ENV === 'production' 
      ? 'Internal server error' 
      : err.message 
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📡 tRPC endpoint: http://localhost:${PORT}/api/trpc`);
});
