import { useState } from 'react';
import { CountrySummary } from '@/types/covid';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';

interface CountrySelectorProps {
  countries: CountrySummary[];
  selectedCountry: string;
  onSelect: (countryCode: string) => void;
  isLoading?: boolean;
}

export const CountrySelector = ({
  countries,
  selectedCountry,
  onSelect,
  isLoading
}: CountrySelectorProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCountries = countries.filter(country =>
    country.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isLoading) {
    return (
      <div className="space-y-2">
        <Skeleton className="h-10 w-full" />
        <ScrollArea className="h-[400px]">
          {Array.from({ length: 10 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-full mb-2" />
          ))}
        </ScrollArea>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      <Input
        type="search"
        placeholder="Search countries..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full"
      />
      <ScrollArea className="h-[400px]">
        <div className="space-y-1">
          {filteredCountries.map((country) => (
            <button
              key={country.countryCode}
              onClick={() => onSelect(country.countryCode)}
              className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                selectedCountry === country.countryCode
                  ? 'bg-primary text-primary-foreground'
                  : 'hover:bg-muted'
              }`}
            >
              <div className="flex justify-between items-center">
                <span>{country.country}</span>
                <span className="text-sm text-muted-foreground">
                  {new Intl.NumberFormat('en-US').format(country.totalCases)}
                </span>
              </div>
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}; 