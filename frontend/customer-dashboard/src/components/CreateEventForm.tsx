'use client'
import React, { useState } from 'react';
import { emitEvent } from '../services/websocket';
import { createEvent } from '@/services/api';

const CreateEventForm = () => {
  const [storeId, setStoreId] = useState('');
  const [customersIn, setCustomersIn] = useState('');
  const [customersOut, setCustomersOut] = useState('');
  const [eventCreated, setEventCreated] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
 
    const event = {
      store_id: storeId,
      customers_in: Number(customersIn),
      customers_out: Number(customersOut),
      time_stamp: new Date().toISOString(), 
    };

    await createEvent(event);

    setEventCreated(true);  
    setStoreId('');
    setCustomersIn('');
    setCustomersOut('');
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold mb-4 text-center">Create Event</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex space-x-4">
          <div className="w-1/3">
            <input
              type="text"
              placeholder="Store ID"
              value={storeId}
              onChange={(e) => setStoreId(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="w-1/3">
            <input
              type="text"
              placeholder="Customers In"
              value={customersIn}
              onChange={(e) => setCustomersIn(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="w-1/3">
            <input
              type="text"
              placeholder="Customers Out"
              value={customersOut}
              onChange={(e) => setCustomersOut(e.target.value)}
              required
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        <div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
          >
            Create Event
          </button>
        </div>
      </form>
      {eventCreated && (
        <p className="mt-4 text-green-500 text-center">Event Created Successfully!</p>
      )}
    </div>
  );
};

export default CreateEventForm;
