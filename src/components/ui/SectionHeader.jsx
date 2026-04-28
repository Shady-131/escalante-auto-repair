export default function SectionHeader({ badge, title, subtitle }) {
  return (
    <div className="mb-10">
      {badge && (
        <span className="inline-flex items-center gap-1.5
          bg-red-100 dark:bg-red-900/20
          text-red-700 dark:text-red-400
          border border-red-200 dark:border-red-800/40
          text-xs px-3 py-1.5 rounded-full uppercase tracking-widest mb-4 font-semibold">
          {badge}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl font-black text-gray-900 dark:text-white mb-3">
        {title}
      </h2>
      {subtitle && (
        <p className="text-gray-500 dark:text-gray-400 text-lg max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}