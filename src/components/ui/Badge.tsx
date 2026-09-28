import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import type { Severity, Status } from '@/types';

type BadgeVariant = 'default' | 'success' | 'warning' | 'danger' | 'info' | 'outline' | 'destructive';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
  icon?: React.ReactNode;
}

const badgeVariants: Record<BadgeVariant, string> = {
  default: 'bg-muted text-muted-foreground',
  success: 'bg-green-50 text-green-700 border-green-200',
  warning: 'bg-amber-50 text-amber-700 border-amber-200',
  danger: 'bg-red-50 text-red-700 border-red-200',
  info: 'bg-blue-50 text-blue-700 border-blue-200',
  outline: 'bg-white text-foreground border-border',
  destructive: 'bg-red-50 text-red-700 border-red-200',
};

export function Badge({ children, variant = 'default', className, icon }: BadgeProps) {
  return (
    <span className={twMerge(clsx(
      'inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold border',
      badgeVariants[variant],
      className
    ))}>
      {icon}
      {children}
    </span>
  );
}

// Severity badge helper
export function SeverityBadge({ severity }: { severity: Severity }) {
  const map: Record<Severity, BadgeVariant> = {
    LOW: 'info',
    MEDIUM: 'warning',
    HIGH: 'danger',
    CRITICAL: 'danger',
  };
  return <Badge variant={map[severity]}>{severity}</Badge>;
}

// Status badge helper
export function StatusBadge({ status }: { status: Status }) {
  const map: Record<Status, { variant: BadgeVariant; label: string }> = {
    Pending: { variant: 'warning', label: 'Pending' },
    Analyzing: { variant: 'info', label: 'Analyzing' },
    Reviewed: { variant: 'default', label: 'Reviewed' },
    Resolved: { variant: 'success', label: 'Resolved' },
  };
  const { variant, label } = map[status];
  return <Badge variant={variant}>{label}</Badge>;
}
