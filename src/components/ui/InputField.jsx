export default function InputField({
  id, label, as: Tag = 'input',
  className = '', children, type, ...props
}) {
  // Only pass `type` to <input> to avoid console warnings on <select>/<textarea>
  const tagProps = Tag === 'input' ? { type, ...props } : props;

  return (
    <div>
      {label && (
        <label htmlFor={id}
          className="block text-xs font-semibold text-gray-400 mb-1.5 uppercase tracking-wide">
          {label}
        </label>
      )}
      <Tag
        id={id}
        className={`w-full px-4 py-2.5 rounded-xl border border-gray-700 bg-gray-800
          text-gray-100 placeholder-gray-600 text-sm
          focus:outline-none focus:ring-2 focus:ring-brand-700 focus:border-transparent
          transition-all duration-150
          ${Tag === 'textarea' ? 'min-h-[120px] resize-y' : ''}
          ${className}`}
        {...tagProps}
      >
        {children}
      </Tag>
    </div>
  );
}