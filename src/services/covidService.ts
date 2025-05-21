import { CovidData, CountrySummary, TimeSeriesData, VaccinationData, GlobalStats } from '@/types/covid';

const BASE_URL = 'https://disease.sh/v3/covid-19';

export const covidService = {
  async getGlobalStats(): Promise<GlobalStats> {
    const response = await fetch(`${BASE_URL}/all`);
    const data = await response.json();
    
    return {
      totalCases: data.cases,
      totalDeaths: data.deaths,
      totalRecovered: data.recovered,
      activeCases: data.active,
      totalVaccinations: data.vaccinations || 0,
      globalVaccinationRate: data.vaccinationRate || 0,
      lastUpdated: new Date(data.updated).toISOString()
    };
  },

  async getCountryStats(countryCode: string): Promise<CountrySummary> {
    const response = await fetch(`${BASE_URL}/countries/${countryCode}`);
    const data = await response.json();
    
    return {
      country: data.country,
      countryCode: data.countryInfo.iso3,
      totalCases: data.cases,
      totalDeaths: data.deaths,
      totalRecovered: data.recovered,
      activeCases: data.active,
      population: data.population,
      lastUpdated: new Date(data.updated).toISOString(),
      vaccinationRate: data.vaccinationRate || 0
    };
  },

  async getTimeSeriesData(countryCode: string, days: number = 30): Promise<TimeSeriesData[]> {
    const response = await fetch(`${BASE_URL}/historical/${countryCode}?lastdays=${days}`);
    const data = await response.json();
    
    return Object.keys(data.timeline.cases).map(date => ({
      date,
      cases: data.timeline.cases[date],
      deaths: data.timeline.deaths[date],
      recovered: data.timeline.recovered[date],
      newCases: data.timeline.cases[date] - (data.timeline.cases[date - 1] || 0),
      newDeaths: data.timeline.deaths[date] - (data.timeline.deaths[date - 1] || 0)
    }));
  },

  async getVaccinationData(countryCode: string): Promise<VaccinationData[]> {
    const response = await fetch(`${BASE_URL}/vaccine/coverage/countries/${countryCode}?lastdays=30`);
    const data = await response.json();
    
    return Object.entries(data.timeline).map(([date, value]) => ({
      date,
      country: data.country,
      totalVaccinations: value as number,
      fullyVaccinated: 0, // These would need to be fetched from a different endpoint
      partiallyVaccinated: 0,
      boosterDoses: 0,
      vaccinationRate: (value as number) / data.population * 100
    }));
  },

  async getAllCountries(): Promise<CountrySummary[]> {
    const response = await fetch(`${BASE_URL}/countries`);
    const data = await response.json();
    
    return data.map((country: any) => ({
      country: country.country,
      countryCode: country.countryInfo.iso3,
      totalCases: country.cases,
      totalDeaths: country.deaths,
      totalRecovered: country.recovered,
      activeCases: country.active,
      population: country.population,
      lastUpdated: new Date(country.updated).toISOString(),
      vaccinationRate: country.vaccinationRate || 0
    }));
  }
}; 