import { configDotenv } from 'dotenv';
import { Kafka } from 'kafkajs';
configDotenv()

const KAFKA_BROKER=process.env.KAFKA_BROKER
export const kafka = new Kafka({
  clientId: 'customer-dashboard',
  brokers: [KAFKA_BROKER],
});
