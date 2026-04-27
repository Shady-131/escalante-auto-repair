export default function InputField({
  label,
  id,
  type = 'text',
  as = 'input',
  children,
  className = '',
  ...rest
}) {
  const base =
    'w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-gray-700 ' +
    'bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 ' +
    'placeholder-gray-400 dark:placeholder-gray-600 text-sm ' +
    'focus:outline-none focus:ring-2 focus:ring-brand-700 focus:border-transparent ' +
    'transition-colors duration-150';

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label htmlFor={id} className="text-sm font-semibold text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}
      {as === 'textarea' ? (
        <textarea id={id} className={`${base} min-h-[120px] resize-y`} {...rest} />
      ) : as === 'select' ? (
        <select id={id} className={base} {...rest}>
          {children}
        </select>
      ) : (
        <input id={id} type={type} className={base} {...rest} />
      )}
    </div>
  );
}