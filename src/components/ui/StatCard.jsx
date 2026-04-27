export default function StatCard({ value, label, sub }) {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700
      rounded-xl p-5 text-center">
      <div className="text-3xl font-black text-brand-700 dark:text-red-400">{value}</div>
      <div className="text-xs text-gray-500 uppercase tracking-widest mt-1 font-semibold">{label}</div>
      {sub && <div className="text-xs text-gray-400 mt-0.5">{sub}</div>}
    </div>
  );
}