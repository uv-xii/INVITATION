import { createRequire } from 'node:module';
import rsvpRoutes from './server/routes/rsvpRoutes.js';
import visitorRoutes from './server/routes/visitorRoutes.js';

const backendRequire = createRequire(new URL('./server/package.json', import.meta.url));
const cors = backendRequire('cors');
const dotenv = backendRequire('dotenv');
const express = backendRequire('express');
const mongoose = backendRequire('mongoose');

dotenv.config();

const app = express();
const allowedOrigins = (process.env.FRONTEND_URL || 'http://localhost:5173')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(cors({ origin: allowedOrigins }));
app.use(express.json({ limit: '16kb' }));
app.use('/api/visitors', visitorRoutes);
app.use('/api/rsvp', rsvpRoutes);

app.get('/', (_req, res) => {
  res.json({ message: 'Wedding invitation API is running!' });
});

app.get('/api/health', (_req, res) => {
  res.json({
    server: 'running',
    database: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected',
  });
});

app.use((error, _req, res, _next) => {
  console.error('Wedding API request failed:', error?.name || 'UnknownError');
  res.status(500).json({ success: false, error: 'The request could not be completed.' });
});

const port = Number(process.env.PORT) || 5000;
const mongoUri = process.env.MONGODB_URI;

async function startServer() {
  if (!mongoUri || /<[^>]*>|placeholder|example\.mongodb\.net/i.test(mongoUri)) {
    throw new Error('Set valid MongoDB credentials in .env before starting the API.');
  }

  await mongoose.connect(mongoUri, {
    dbName: process.env.MONGODB_DB_NAME || 'wedding_invitation',
  });
  console.log('MongoDB connected successfully.');

  app.listen(port, () => {
    console.log(`Wedding API running at http://localhost:${port}`);
  });
}

startServer().catch((error) => {
  console.error(`Wedding API startup failed: ${error.message}`);
  process.exitCode = 1;
});
