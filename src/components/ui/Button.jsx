const BASE =
  'inline-flex items-center justify-center gap-2 font-semibold rounded-xl ' +
  'transition-all duration-200 ease-out focus:outline-none ' +
  'focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-700 ' +
  'select-none disabled:opacity-50 disabled:pointer-events-none';

const VARIANTS = {
  primary:
    'bg-brand-700 text-white hover:bg-brand-800 hover:scale-[1.04] ' +
    'hover:shadow-lg active:scale-[0.97] shadow-md',
  call:
    'bg-transparent border-2 border-brand-700 text-red-400 ' +
    'hover:bg-brand-700 hover:text-white hover:scale-[1.05] ' +
    'hover:shadow-[0_0_20px_rgba(139,26,26,0.55)] active:scale-[0.97] ' +
    'animate-pulse-ring',
  outline:
    'bg-transparent border-2 border-brand-700 text-brand-700 ' +
    'dark:text-red-400 dark:border-red-700 ' +
    'hover:bg-brand-700 hover:text-white hover:scale-[1.04] ' +
    'hover:shadow-lg active:scale-[0.97]',
  ghost:
    'bg-transparent border border-gray-600 text-gray-300 ' +
    'hover:border-brand-700 hover:text-red-400 hover:scale-[1.03] active:scale-[0.97]',
  danger:
    'bg-red-700 text-white hover:bg-red-900 hover:scale-[1.03] active:scale-[0.97] shadow-md',
  secondary:
    'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200 ' +
    'border border-gray-300 dark:border-gray-700 ' +
    'hover:bg-gray-200 dark:hover:bg-gray-700 hover:scale-[1.02] active:scale-[0.97]',
};

const SIZES = {
  xs: 'text-xs px-2.5 py-1.5',
  sm: 'text-sm px-3.5 py-2',
  md: 'text-sm px-4 py-2.5',
  lg: 'text-base px-6 py-3.5',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  as: Tag = 'button',
  className = '',
  children,
  ...rest
}) {
  return (
    <Tag
      className={[BASE, VARIANTS[variant] ?? VARIANTS.primary, SIZES[size] ?? SIZES.md, className]
        .filter(Boolean)
        .join(' ')}
      {...rest}
    >
      {children}
    </Tag>
  );
}