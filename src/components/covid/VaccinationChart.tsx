import { VaccinationData } from '@/types/covid';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { Skeleton } from '@/components/ui/skeleton';

interface VaccinationChartProps {
  data: VaccinationData[];
  isLoading?: boolean;
}

export const VaccinationChart = ({ data, isLoading }: VaccinationChartProps) => {
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

  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  return (
    <div className="h-[400px]">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
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
          <Area
            type="monotone"
            dataKey="totalVaccinations"
            stackId="1"
            stroke="#2563eb"
            fill="#2563eb"
            name="Total Vaccinations"
          />
          <Area
            type="monotone"
            dataKey="fullyVaccinated"
            stackId="1"
            stroke="#16a34a"
            fill="#16a34a"
            name="Fully Vaccinated"
          />
          <Area
            type="monotone"
            dataKey="partiallyVaccinated"
            stackId="1"
            stroke="#7c3aed"
            fill="#7c3aed"
            name="Partially Vaccinated"
          />
          <Area
            type="monotone"
            dataKey="boosterDoses"
            stackId="1"
            stroke="#ea580c"
            fill="#ea580c"
            name="Booster Doses"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}; 