
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5002', 
});

export const getHistoryEvents = async () => {
  try {
    const response = await api.get('/api/history-data');
    return response.data;
  } catch (error) {
    console.error('Error fetching history events:', error);
    return [];
  }
};

export const createEvent = async (event: any) => {
  try {
    await api.post('api/events/send', event);  
  } catch (error) {
    console.error('Error creating event:', error);
  }
};
