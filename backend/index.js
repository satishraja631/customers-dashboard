import { configDotenv } from 'dotenv'
import express from 'express'
import connectDB from './config/db.js'
import http from 'http';
import cors from 'cors';
import apiRoutes from './routes/api.js';
import { createWebSocketServer } from './websocket.js';
import { startConsumer } from './kafka/consumer.js';
import eventProducerRoutes from './routes/eventProducer.js';
configDotenv()
const app=express()
connectDB()

const PORT =process.env.PORT || 5001

const server = http.createServer(app);
const io = createWebSocketServer(server);

app.use(cors());
app.use(express.json());
app.use('/api/events', eventProducerRoutes);
app.use('/api', apiRoutes);

const start = async () => {
  await connectDB();
  await startConsumer(io);

  const PORT = process.env.PORT || 5000;
  server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

start();

