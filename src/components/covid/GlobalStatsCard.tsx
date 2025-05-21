import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface GlobalStatsCardProps {
  title: string;
  value?: number;
  isLoading?: boolean;
}

export const GlobalStatsCard = ({ title, value, isLoading }: GlobalStatsCardProps) => {
  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US').format(num);
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Skeleton className="h-8 w-[120px]" />
        ) : (
          <div className="text-2xl font-bold">
            {value !== undefined ? formatNumber(value) : 'N/A'}
          </div>
        )}
      </CardContent>
    </Card>
  );
}; 