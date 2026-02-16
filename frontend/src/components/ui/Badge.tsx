import type { ReactNode } from 'react';

interface BadgeProps {
  children: ReactNode;
  variant?: 'primary' | 'accent' | 'neutral' | 'default' | 'success' | 'warning' | 'info';
  className?: string;
}

export default function Badge({ children, variant = 'neutral', className = '' }: BadgeProps) {
  const baseClasses = 'inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ring-1';

  const variantClasses = {
    primary: 'bg-rose-50 text-rose-800 ring-rose-200',
    accent: 'bg-amber-50 text-amber-800 ring-amber-200',
    neutral: 'bg-slate-50 text-slate-700 ring-slate-200',
    // Backward-compatible aliases for existing pages
    default: 'bg-slate-50 text-slate-700 ring-slate-200',
    success: 'bg-rose-50 text-rose-800 ring-rose-200',
    warning: 'bg-amber-50 text-amber-800 ring-amber-200',
    info: 'bg-slate-50 text-slate-700 ring-slate-200',
  };

  return (
    <span className={`${baseClasses} ${variantClasses[variant]} ${className}`}>
      {children}
    </span>
  );
}
