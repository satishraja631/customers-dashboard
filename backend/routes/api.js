import { Router } from 'express';
import { LiveEvent } from '../models/LiveEvent.js';
import { HourlyAggregate } from '../models/HourlyAggregate.js';

const router = Router();

router.get('/live-data', async (req, res) => {
  const data = await LiveEvent.find().sort({ createdAt: -1 }).limit(10);
  res.json(data);
});

router.get('/history-data', async (req, res) => {
  const last24Hours = new Date(Date.now() - 24 * 60 * 60 * 1000);
  const data = await HourlyAggregate.find({
    hour: { $gte: last24Hours.toISOString() },
  }).sort({ hour: -1 });

  res.json(data);
});

export default router;
