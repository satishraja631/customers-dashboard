import { kafka } from '../config/kafka.js';
import { LiveEvent } from '../models/LiveEvent.js';
import { HourlyAggregate } from '../models/HourlyAggregate.js';
import { Server } from 'socket.io';

export const startConsumer = async (io) => {
  const consumer = kafka.consumer({ groupId: 'customer-group' });
  await consumer.connect();
  await consumer.subscribe({ topic: 'store-events', fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ message }) => {
      const payload = JSON.parse(message.value.toString());
      const { store_id, customers_in, customers_out, time_stamp } = payload;

      // Save to live events
      const liveEvent = new LiveEvent(payload);
      await liveEvent.save();

      // Emit via WebSocket
      io.emit('customer-event', liveEvent);

      
      const hour = new Date(time_stamp).toISOString(); 
      const existing = await HourlyAggregate.findOne({ store_id, hour });
      if (existing) {
        existing.total_in += customers_in;
        existing.total_out += customers_out;
        await existing.save();
      } else {
        await HourlyAggregate.create({
          store_id,
          hour,
          total_in: customers_in,
          total_out: customers_out,
        });
      }
    },
  });
};
