export default function StatCard({ value, label, sub }) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 text-center">
      <div className="text-red-400 text-2xl font-black">{value}</div>
      <div className="text-white text-xs font-semibold mt-1">{label}</div>
      {sub && <div className="text-gray-600 text-[11px] mt-0.5">{sub}</div>}
    </div>
  );
}