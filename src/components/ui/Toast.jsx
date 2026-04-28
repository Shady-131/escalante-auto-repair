import { useEffect, useState } from 'react';

export default function Toast({ message }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!message) { setVisible(false); return; }
    setVisible(true);
    const t = setTimeout(() => setVisible(false), 3200);
    return () => clearTimeout(t);
  }, [message]);

  if (!visible || !message) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999]
      bg-gray-800 border border-gray-700 text-white
      px-5 py-3 rounded-xl shadow-2xl text-sm font-medium
      animate-fade-in max-w-sm text-center pointer-events-none">
      {message}
    </div>
  );
}