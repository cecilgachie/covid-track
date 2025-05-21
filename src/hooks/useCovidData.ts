import { useQuery } from '@tanstack/react-query';
import { covidService } from '@/services/covidService';
import { GlobalStats, CountrySummary, TimeSeriesData, VaccinationData } from '@/types/covid';

export const useCovidData = () => {
  const useGlobalStats = () => {
    return useQuery<GlobalStats>({
      queryKey: ['globalStats'],
      queryFn: covidService.getGlobalStats,
      staleTime: 1000 * 60 * 5, // 5 minutes
    });
  };

  const useCountryStats = (countryCode: string) => {
    return useQuery<CountrySummary>({
      queryKey: ['countryStats', countryCode],
      queryFn: () => covidService.getCountryStats(countryCode),
      staleTime: 1000 * 60 * 5, // 5 minutes
      enabled: !!countryCode,
    });
  };

  const useTimeSeriesData = (countryCode: string, days: number = 30) => {
    return useQuery<TimeSeriesData[]>({
      queryKey: ['timeSeries', countryCode, days],
      queryFn: () => covidService.getTimeSeriesData(countryCode, days),
      staleTime: 1000 * 60 * 5, // 5 minutes
      enabled: !!countryCode,
    });
  };

  const useVaccinationData = (countryCode: string) => {
    return useQuery<VaccinationData[]>({
      queryKey: ['vaccinationData', countryCode],
      queryFn: () => covidService.getVaccinationData(countryCode),
      staleTime: 1000 * 60 * 5, // 5 minutes
      enabled: !!countryCode,
    });
  };

  const useAllCountries = () => {
    return useQuery<CountrySummary[]>({
      queryKey: ['allCountries'],
      queryFn: covidService.getAllCountries,
      staleTime: 1000 * 60 * 5, // 5 minutes
    });
  };

  return {
    useGlobalStats,
    useCountryStats,
    useTimeSeriesData,
    useVaccinationData,
    useAllCountries,
  };
}; 