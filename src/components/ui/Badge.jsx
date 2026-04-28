const STATUS_STYLES = {
  'Completed':   'bg-green-900/30 text-green-400 border-green-700/40',
  'In Progress': 'bg-blue-900/30 text-blue-400 border-blue-700/40',
  'Pending':     'bg-yellow-900/30 text-yellow-400 border-yellow-700/40',
  'Scheduled':   'bg-purple-900/30 text-purple-400 border-purple-700/40',
  'Cancelled':   'bg-red-900/30 text-red-400 border-red-700/40',
  'Paid':        'bg-green-900/30 text-green-400 border-green-700/40',
  'Low Stock':   'bg-orange-900/30 text-orange-400 border-orange-700/40',
  'In Stock':    'bg-green-900/30 text-green-400 border-green-700/40',
};

export default function Badge({ status }) {
  const cls = STATUS_STYLES[status] ?? 'bg-gray-800 text-gray-400 border-gray-700';
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${cls}`}>
      {status}
    </span>
  );
}