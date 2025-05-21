export interface CovidData {
  date: string;
  country: string;
  countryCode: string;
  cases: number;
  deaths: number;
  recovered: number;
  active: number;
  newCases: number;
  newDeaths: number;
  population: number;
  tests: number;
  vaccinations: {
    total: number;
    fullyVaccinated: number;
    partiallyVaccinated: number;
    boosterDoses: number;
  };
}

export interface CountrySummary {
  country: string;
  countryCode: string;
  totalCases: number;
  totalDeaths: number;
  totalRecovered: number;
  activeCases: number;
  population: number;
  lastUpdated: string;
  vaccinationRate: number;
}

export interface TimeSeriesData {
  date: string;
  cases: number;
  deaths: number;
  recovered: number;
  newCases: number;
  newDeaths: number;
}

export interface VaccinationData {
  date: string;
  country: string;
  totalVaccinations: number;
  fullyVaccinated: number;
  partiallyVaccinated: number;
  boosterDoses: number;
  vaccinationRate: number;
}

export interface GlobalStats {
  totalCases: number;
  totalDeaths: number;
  totalRecovered: number;
  activeCases: number;
  totalVaccinations: number;
  globalVaccinationRate: number;
  lastUpdated: string;
} 