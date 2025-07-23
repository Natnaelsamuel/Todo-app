// components/admin/MetricCard.tsx
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { ArrowUp, ArrowDown } from 'lucide-react'
import { cn } from '@/lib/utils'

export function MetricCard({
  title,
  value,
  icon,
  trend,
  change
}: {
  title: string
  value: number
  icon: React.ReactNode
  trend: 'up' | 'down'
  change: number
}) {
  const TrendIcon = trend === 'up' ? ArrowUp : ArrowDown

  return (
    <Card className="hover:shadow-sm transition-all">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <div className={cn(
          'p-2 rounded-full',
          trend === 'up' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
        )}>
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className={cn(
          'flex items-center text-xs',
          trend === 'up' ? 'text-green-600' : 'text-red-600'
        )}>
          <TrendIcon className="h-3 w-3 mr-1" />
          {change}% from last month
        </div>
      </CardContent>
    </Card>
  )
}