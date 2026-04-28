import { Upload } from 'lucide-react';

export default function UploadZone({ label, hint, onUpload }) {
  function handleDrop(e) {
    e.preventDefault();
    onUpload?.();
  }

  return (
    <div
      onClick={onUpload}
      onDrop={handleDrop}
      onDragOver={e => e.preventDefault()}
      className="border-2 border-dashed border-gray-700 hover:border-brand-700
        rounded-xl p-8 text-center cursor-pointer transition-all duration-200
        hover:bg-red-900/5 group"
    >
      <Upload
        className="w-10 h-10 text-gray-600 group-hover:text-red-400 mx-auto mb-3 transition-colors"
        strokeWidth={1.5}
      />
      <p className="text-gray-300 font-semibold text-sm">{label}</p>
      {hint && <p className="text-gray-600 text-xs mt-1">{hint}</p>}
    </div>
  );
}