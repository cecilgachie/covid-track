import { CountrySummary } from '@/types/covid';
import { ComposableMap, Geographies, Geography, ZoomableGroup } from 'react-simple-maps';
import { Skeleton } from '@/components/ui/skeleton';
import { Tooltip } from '@/components/ui/tooltip';

const geoUrl = "https://raw.githubusercontent.com/deldersveld/topojson/master/world-countries.json";

interface WorldMapProps {
  countries: CountrySummary[];
  selectedCountry: string;
  onSelectCountry: (countryCode: string) => void;
  isLoading?: boolean;
}

export const WorldMap = ({
  countries,
  selectedCountry,
  onSelectCountry,
  isLoading
}: WorldMapProps) => {
  if (isLoading) {
    return <Skeleton className="h-[400px] w-full" />;
  }

  const getCountryColor = (geo: any) => {
    const country = countries.find(c => c.countryCode === geo.properties.iso_a3);
    if (!country) return "#F5F4F6";
    
    const casesPerMillion = (country.totalCases / country.population) * 1000000;
    
    if (casesPerMillion > 100000) return "#7F1D1D";
    if (casesPerMillion > 50000) return "#991B1B";
    if (casesPerMillion > 25000) return "#B91C1C";
    if (casesPerMillion > 10000) return "#DC2626";
    if (casesPerMillion > 5000) return "#EF4444";
    if (casesPerMillion > 1000) return "#F87171";
    if (casesPerMillion > 500) return "#FCA5A5";
    if (casesPerMillion > 100) return "#FECACA";
    return "#FEE2E2";
  };

  return (
    <div className="h-[400px]">
      <ComposableMap projection="geoMercator">
        <ZoomableGroup>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map(geo => {
                const isSelected = geo.properties.iso_a3 === selectedCountry;
                return (
                  <Tooltip
                    key={geo.rsmKey}
                    content={
                      <div className="p-2">
                        <p className="font-medium">{geo.properties.name}</p>
                        {countries.find(c => c.countryCode === geo.properties.iso_a3) && (
                          <>
                            <p className="text-sm">
                              Cases: {new Intl.NumberFormat('en-US').format(
                                countries.find(c => c.countryCode === geo.properties.iso_a3)?.totalCases || 0
                              )}
                            </p>
                            <p className="text-sm">
                              Deaths: {new Intl.NumberFormat('en-US').format(
                                countries.find(c => c.countryCode === geo.properties.iso_a3)?.totalDeaths || 0
                              )}
                            </p>
                          </>
                        )}
                      </div>
                    }
                  >
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill={getCountryColor(geo)}
                      stroke="#FFFFFF"
                      strokeWidth={0.5}
                      style={{
                        default: {
                          outline: 'none',
                        },
                        hover: {
                          fill: "#2563eb",
                          outline: 'none',
                        },
                        pressed: {
                          outline: 'none',
                        },
                      }}
                      onClick={() => onSelectCountry(geo.properties.iso_a3)}
                    />
                  </Tooltip>
                );
              })
            }
          </Geographies>
        </ZoomableGroup>
      </ComposableMap>
    </div>
  );
}; 