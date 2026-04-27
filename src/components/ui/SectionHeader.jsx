export default function SectionHeader({ badge, title, subtitle, center = false }) {
  return (
    <div className={`mb-10 ${center ? 'text-center' : ''}`}>
      {badge && (
        <span className="inline-block bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400
          border border-red-200 dark:border-red-800/40 text-xs px-3 py-1.5 rounded-full
          uppercase tracking-widest mb-3 font-semibold">
          {badge}
        </span>
      )}
      <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-gray-500 dark:text-gray-400 mt-2 text-base leading-relaxed max-w-xl">
          {subtitle}
        </p>
      )}
    </div>
  );
}