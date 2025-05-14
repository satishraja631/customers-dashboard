'use client'
import React, { useEffect, useState } from 'react';
import { getHistoryEvents } from '../services/api';

const HistoryTable = () => {
  const [historyEvents, setHistoryEvents] = useState<any[]>([]);

  useEffect(() => {
    const fetchHistory = async () => {
      const data = await getHistoryEvents();
      setHistoryEvents(data);
    };
    fetchHistory();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">History of Events</h2>
      <table className="table-auto w-full border-collapse bg-white shadow-md rounded-lg">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="py-2 px-4 text-sm font-medium">Store ID</th>
            <th className="py-2 px-4 text-sm font-medium">Customers In</th>
            <th className="py-2 px-4 text-sm font-medium">Customers Out</th>
            <th className="py-2 px-4 text-sm font-medium">Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {historyEvents.map((event, index) => (
            <tr key={index} className="border-t border-gray-200">
              <td className="py-2 px-4 text-sm text-gray-600">{event.store_id}</td>
              <td className="py-2 px-4 text-sm text-gray-600">{event.total_in}</td>
              <td className="py-2 px-4 text-sm text-gray-600">{event.total_out}</td>
              <td className="py-2 px-4 text-sm text-gray-600">
                {new Date(event.hour).toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default HistoryTable;
