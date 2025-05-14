
import { io } from 'socket.io-client';

const socket = io('http://localhost:5002');  

export const listenForLiveEvents = (callback: (event: any) => void) => {
  socket.on('customer-event', callback); 
};

export const emitEvent = (event: any) => {
  socket.emit('create_event', event); 
};
