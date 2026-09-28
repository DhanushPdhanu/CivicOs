import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export function Card({ children, className, hover }: CardProps) {
  return (
    <div className={twMerge(clsx(
      'bg-white border border-border rounded-xl',
      hover && 'hover:border-primary/30 hover:shadow-md transition-all cursor-pointer',
      className
    ))}>
      {children}
    </div>
  );
}

export function CardHeader({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={twMerge('px-6 py-4 border-b border-border', className)}>
      {children}
    </div>
  );
}

export function CardContent({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={twMerge('px-6 py-4', className)}>
      {children}
    </div>
  );
}

// Metric Card for dashboards
interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  trend?: { value: string; positive: boolean };
  className?: string;
}

export function MetricCard({ title, value, subtitle, icon, trend, className }: MetricCardProps) {
  return (
    <Card className={className}>
      <CardContent className="py-5">
        <div className="flex justify-between items-start mb-2">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          {icon && <div className="p-2 bg-primary-50 rounded-lg text-primary-600">{icon}</div>}
        </div>
        <p className="text-3xl font-bold text-foreground">{value}</p>
        {subtitle && <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>}
        {trend && (
          <p className={clsx('text-xs font-medium mt-1', trend.positive ? 'text-primary-600' : 'text-destructive')}>
            {trend.positive ? '↑' : '↓'} {trend.value}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
