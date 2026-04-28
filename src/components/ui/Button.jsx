import { forwardRef } from 'react';

const VARIANTS = {
  primary:   'bg-brand-700 hover:bg-brand-800 text-white border border-brand-700',
  secondary: 'bg-gray-800 hover:bg-gray-700 text-gray-200 border border-gray-700',
  outline:   'bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700',
  ghost:     'bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 border border-transparent',
  danger:    'bg-red-700 hover:bg-red-800 text-white border border-red-700',
  call:      'bg-green-700 hover:bg-green-800 text-white border border-green-700',
};

const SIZES = {
  sm: 'px-3 py-1.5 text-xs',
  md: 'px-4 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
};

const Button = forwardRef(({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  as: Tag = 'button',
  ...props
}, ref) => (
  <Tag
    ref={ref}
    className={`inline-flex items-center gap-2 font-semibold rounded-xl
      transition-all duration-150 cursor-pointer
      focus:outline-none focus:ring-2 focus:ring-brand-700 focus:ring-offset-2
      disabled:opacity-50 disabled:cursor-not-allowed
      ${VARIANTS[variant] ?? VARIANTS.primary}
      ${SIZES[size] ?? SIZES.md}
      ${className}`}
    {...props}
  >
    {children}
  </Tag>
));
Button.displayName = 'Button';
export default Button;