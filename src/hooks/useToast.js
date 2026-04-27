import { useState, useCallback } from 'react';

export function useToast() {
  const [message, setMessage] = useState('');

  const showToast = useCallback((msg, duration = 3200) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), duration);
  }, []);

  return { message, showToast };
}