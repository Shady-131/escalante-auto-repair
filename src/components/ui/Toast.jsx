import { useEffect, useState } from 'react';

export default function Toast({ message }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setVisible(true);
    } else {
      const t = setTimeout(() => setVisible(false), 300);
      return () => clearTimeout(t);
    }
  }, [message]);

  if (!visible && !message) return null;

  return (
    <div
      className={`fixed bottom-6 left-1/2 z-[9999] transition-all duration-400
        ${message ? 'opacity-100 -translate-x-1/2 translate-y-0' : 'opacity-0 -translate-x-1/2 translate-y-4'}`}
    >
      <div className="bg-gray-900 dark:bg-gray-800 text-white px-5 py-3 rounded-xl
        shadow-2xl border-l-4 border-brand-700 text-sm font-medium max-w-sm whitespace-nowrap">
        {message}
      </div>
    </div>
  );
}