import { useState, useCallback } from 'react';

export function useToast() {
  const [message, setMessage] = useState('');

  const showToast = useCallback((msg) => {
    setMessage(msg);
    const t = setTimeout(() => setMessage(''), 3500);
    return () => clearTimeout(t);
  }, []);

  return { message, showToast };
}