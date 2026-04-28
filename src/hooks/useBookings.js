import { useState } from 'react';
import { MOCK_BOOKINGS } from '../data/mockData';

export function useBookings() {
  const [bookings, setBookings] = useState(MOCK_BOOKINGS);

  function updateStatus(id, newStatus) {
    setBookings(prev =>
      prev.map(b => b.id === id ? { ...b, status: newStatus } : b)
    );
  }

  function addBooking(booking) {
    setBookings(prev => [booking, ...prev]);
  }

  return { bookings, updateStatus, addBooking };
}