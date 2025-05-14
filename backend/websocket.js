
import { Server } from 'socket.io';

export const createWebSocketServer = (httpServer) => {
  const io = new Server(httpServer, {
    cors: { origin: '*' }
  });

  io.on('connection', (socket) => {
    console.log('WebSocket client connected');
  });

  return io;
};
