import { Router } from 'express';
import { Kafka } from 'kafkajs';

const router = Router();

const kafka = new Kafka({
  clientId: 'event-producer',
  brokers: [process.env.KAFKA_BROKER || 'kafka:9092'],
});

const producer = kafka.producer();


(async () => {
  await producer.connect();
})();

router.post('/send', async (req, res) => {
  const { store_id, customers_in, customers_out, time_stamp } = req.body;

  if (!store_id || customers_in === undefined || customers_out === undefined || !time_stamp) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const eventPayload = {
    store_id,
    customers_in,
    customers_out,
    time_stamp,
  };

  try {
    await producer.send({
      topic: 'store-events',
      messages: [{ value: JSON.stringify(eventPayload) }],
    });

    res.status(200).json({ status: 'Event sent', event: eventPayload });
  } catch (err) {
    console.error('Error sending Kafka message:', err);
    res.status(500).json({ error: 'Failed to send event' });
  }
});

export default router;
