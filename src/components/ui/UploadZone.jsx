import { Upload } from 'lucide-react';

export default function UploadZone({ label = 'Drop files here or click to browse', hint = '', onUpload }) {
  return (
    <button
      type="button"
      onClick={onUpload}
      className="w-full border-2 border-dashed border-gray-300 dark:border-gray-700
        hover:border-brand-700 dark:hover:border-brand-700
        bg-gray-50 dark:bg-gray-900/50 hover:bg-red-50 dark:hover:bg-red-900/10
        rounded-xl p-8 flex flex-col items-center gap-3 cursor-pointer
        transition-all duration-200 group"
    >
      <Upload className="w-8 h-8 text-gray-400 group-hover:text-brand-700 transition-colors" strokeWidth={1.5} />
      <div className="text-sm font-semibold text-gray-600 dark:text-gray-400 group-hover:text-brand-700 transition-colors">
        {label}
      </div>
      {hint && <div className="text-xs text-gray-400">{hint}</div>}
    </button>
  );
}