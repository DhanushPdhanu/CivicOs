import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface CardProps {
  children?: React.ReactNode;
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

export function CardHeader({ children, className, title, icon }: { children?: React.ReactNode; className?: string; title?: string; icon?: React.ReactNode }) {
  return (
    <div className={twMerge('px-6 py-4 border-b border-border flex items-center justify-between', className)}>
      {title ? (
        <div className="flex items-center gap-2">
          {icon}
          <h3 className="font-semibold text-foreground text-lg">{title}</h3>
        </div>
      ) : null}
      {children}
    </div>
  );
}

export function CardContent({ children, className }: { children?: React.ReactNode; className?: string }) {
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
  trend?: { value: string | number; positive?: boolean; isPositive?: boolean };
  className?: string;
}

export function MetricCard({ title, value, subtitle, icon, trend, className }: MetricCardProps) {
  const isPos = trend?.positive ?? trend?.isPositive ?? true;
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
          <p className={clsx('text-xs font-medium mt-1', isPos ? 'text-primary-600' : 'text-destructive')}>
            {isPos ? '↑' : '↓'} {trend.value}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
