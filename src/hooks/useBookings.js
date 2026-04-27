import { useState, useCallback } from 'react';
import { INITIAL_BOOKINGS } from '../data/mockData';

export function useBookings() {
  const [bookings, setBookings] = useState(INITIAL_BOOKINGS);

  const updateStatus = useCallback((id, newStatus) => {
    setBookings(prev =>
      prev.map(b => (b.id === id ? { ...b, status: newStatus } : b))
    );
  }, []);

  const addBooking = useCallback(booking => {
    setBookings(prev => [booking, ...prev]);
  }, []);

  return { bookings, updateStatus, addBooking };
}