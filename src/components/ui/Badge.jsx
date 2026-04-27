const VARIANT_MAP = {
  'Completed':     'bg-green-100  text-green-800  dark:bg-green-900/30  dark:text-green-400',
  'Done':          'bg-green-100  text-green-800  dark:bg-green-900/30  dark:text-green-400',
  'In Progress':   'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
  'Pending':       'bg-slate-100  text-slate-600  dark:bg-slate-800     dark:text-slate-400',
  'Scheduled':     'bg-blue-100   text-blue-800   dark:bg-blue-900/30   dark:text-blue-400',
  'Quality Check': 'bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400',
  'Ready':         'bg-teal-100   text-teal-800   dark:bg-teal-900/30   dark:text-teal-400',
  'Cancelled':     'bg-red-100    text-red-800    dark:bg-red-900/30    dark:text-red-400',
};

export default function Badge({ status }) {
  const cls = VARIANT_MAP[status] ?? 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400';
  return (
    <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${cls}`}>
      {status}
    </span>
  );
}