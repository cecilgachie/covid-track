import { useState } from 'react';
import { CountrySummary } from '@/types/covid';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { Skeleton } from '@/components/ui/skeleton';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface CountryComparisonProps {
  countries: CountrySummary[];
  isLoading?: boolean;
}

type ComparisonMetric = 'totalCases' | 'totalDeaths' | 'totalRecovered' | 'activeCases' | 'vaccinationRate';

export const CountryComparison = ({ countries, isLoading }: CountryComparisonProps) => {
  const [metric, setMetric] = useState<ComparisonMetric>('totalCases');
  const [limit, setLimit] = useState<number>(10);

  if (isLoading) {
    return <Skeleton className="h-[400px] w-full" />;
  }

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('en-US').format(value);
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  const sortedCountries = [...countries]
    .sort((a, b) => b[metric] - a[metric])
    .slice(0, limit);

  const data = sortedCountries.map(country => ({
    country: country.country,
    value: country[metric],
    population: country.population
  }));

  const getMetricLabel = (metric: ComparisonMetric) => {
    switch (metric) {
      case 'totalCases':
        return 'Total Cases';
      case 'totalDeaths':
        return 'Total Deaths';
      case 'totalRecovered':
        return 'Total Recovered';
      case 'activeCases':
        return 'Active Cases';
      case 'vaccinationRate':
        return 'Vaccination Rate';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-4">
        <Select value={metric} onValueChange={(value) => setMetric(value as ComparisonMetric)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select metric" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="totalCases">Total Cases</SelectItem>
            <SelectItem value="totalDeaths">Total Deaths</SelectItem>
            <SelectItem value="totalRecovered">Total Recovered</SelectItem>
            <SelectItem value="activeCases">Active Cases</SelectItem>
            <SelectItem value="vaccinationRate">Vaccination Rate</SelectItem>
          </SelectContent>
        </Select>

        <Select value={limit.toString()} onValueChange={(value) => setLimit(parseInt(value))}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Number of countries" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="5">Top 5</SelectItem>
            <SelectItem value="10">Top 10</SelectItem>
            <SelectItem value="20">Top 20</SelectItem>
            <SelectItem value="50">Top 50</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="country"
              tick={{ fontSize: 12 }}
              angle={-45}
              textAnchor="end"
              height={70}
            />
            <YAxis
              tickFormatter={metric === 'vaccinationRate' ? formatPercentage : formatNumber}
              tick={{ fontSize: 12 }}
            />
            <Tooltip
              formatter={(value: number) =>
                metric === 'vaccinationRate' ? formatPercentage(value) : formatNumber(value)
              }
            />
            <Legend />
            <Bar
              dataKey="value"
              fill="#2563eb"
              name={getMetricLabel(metric)}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}; 