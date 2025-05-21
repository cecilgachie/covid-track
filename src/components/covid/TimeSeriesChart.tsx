import { TimeSeriesData } from '@/types/covid';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { Skeleton } from '@/components/ui/skeleton';

interface TimeSeriesChartProps {
  data: TimeSeriesData[];
  isLoading?: boolean;
}

export const TimeSeriesChart = ({ data, isLoading }: TimeSeriesChartProps) => {
  if (isLoading) {
    return <Skeleton className="h-[400px] w-full" />;
  }

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('en-US').format(value);
  };

  return (
    <div className="h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="date"
            tickFormatter={formatDate}
            tick={{ fontSize: 12 }}
          />
          <YAxis
            tickFormatter={formatNumber}
            tick={{ fontSize: 12 }}
          />
          <Tooltip
            formatter={(value: number) => formatNumber(value)}
            labelFormatter={formatDate}
          />
          <Legend />
          <Line
            type="monotone"
            dataKey="cases"
            stroke="#2563eb"
            name="Total Cases"
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="deaths"
            stroke="#dc2626"
            name="Total Deaths"
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="recovered"
            stroke="#16a34a"
            name="Total Recovered"
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="newCases"
            stroke="#7c3aed"
            name="New Cases"
            strokeWidth={2}
          />
          <Line
            type="monotone"
            dataKey="newDeaths"
            stroke="#ea580c"
            name="New Deaths"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}; 