import mongoose from 'mongoose';

const hourlySchema = new mongoose.Schema({
  store_id: Number,
  hour: String, 
  total_in: Number,
  total_out: Number,
});

export const HourlyAggregate = mongoose.model('HourlyAggregate', hourlySchema);
