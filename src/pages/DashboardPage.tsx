import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useComplaints } from '@/context/complaint-context';
import { useAuth } from '@/context/auth-context';
import NavBar from '@/components/NavBar';
import ComplaintList from '@/components/ComplaintList';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MOCK_CATEGORIES } from '@/lib/data';
import { useCovidData } from '@/hooks/useCovidData';
import { GlobalStatsCard } from '@/components/covid/GlobalStatsCard';
import { CountrySelector } from '@/components/covid/CountrySelector';
import { TimeSeriesChart } from '@/components/covid/TimeSeriesChart';
import { VaccinationChart } from '@/components/covid/VaccinationChart';
import { WorldMap } from '@/components/covid/WorldMap';
import { CountryComparison } from '@/components/covid/CountryComparison';

const DashboardPage = () => {
  const { userComplaints, complaints } = useComplaints();
  const { user, isAdmin, isAgency } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedCountry, setSelectedCountry] = useState<string>('USA');
  const [timeRange, setTimeRange] = useState<number>(30);
  
  const {
    useGlobalStats,
    useCountryStats,
    useTimeSeriesData,
    useVaccinationData,
    useAllCountries
  } = useCovidData();

  const { data: globalStats, isLoading: isLoadingGlobal } = useGlobalStats();
  const { data: countryStats, isLoading: isLoadingCountry } = useCountryStats(selectedCountry);
  const { data: timeSeriesData, isLoading: isLoadingTimeSeries } = useTimeSeriesData(selectedCountry, timeRange);
  const { data: vaccinationData, isLoading: isLoadingVaccination } = useVaccinationData(selectedCountry);
  const { data: allCountries, isLoading: isLoadingCountries } = useAllCountries();

  // Count complaints by status
  const getStatusCounts = () => {
    const counts = {
      pending: 0,
      under_review: 0,
      assigned: 0,
      in_progress: 0,
      resolved: 0,
      closed: 0
    };

    const complaintsToCount = isAdmin ?
    complaints :
    isAgency ?
    complaints.filter((c) => c.assignedToAgencyId === user?.id) :
    userComplaints;

    complaintsToCount.forEach((complaint) => {
      counts[complaint.status]++;
    });

    return counts;
  };

  const statusCounts = getStatusCounts();

  // Calculate total and resolved complaints
  const totalComplaints = isAdmin ?
  complaints.length :
  isAgency ?
  complaints.filter((c) => c.assignedToAgencyId === user?.id).length :
  userComplaints.length;

  const resolvedComplaints = isAdmin ?
  complaints.filter((c) => c.status === 'resolved' || c.status === 'closed').length :
  isAgency ?
  complaints.filter((c) => (c.status === 'resolved' || c.status === 'closed') && c.assignedToAgencyId === user?.id).length :
  userComplaints.filter((c) => c.status === 'resolved' || c.status === 'closed').length;

  const resolutionRate = totalComplaints ? Math.round(resolvedComplaints / totalComplaints * 100) : 0;

  // Get active complaints (those not closed or resolved)
  const activeComplaints = isAdmin ?
  complaints.filter((c) => c.status !== 'resolved' && c.status !== 'closed') :
  isAgency ?
  complaints.filter((c) => c.status !== 'resolved' && c.status !== 'closed' && c.assignedToAgencyId === user?.id) :
  userComplaints.filter((c) => c.status !== 'resolved' && c.status !== 'closed');

  // Get recent complaints (last 30 days)
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const recentComplaints = isAdmin ?
  complaints.filter((c) => new Date(c.createdAt) >= thirtyDaysAgo) :
  isAgency ?
  complaints.filter((c) => new Date(c.createdAt) >= thirtyDaysAgo && c.assignedToAgencyId === user?.id) :
  userComplaints.filter((c) => new Date(c.createdAt) >= thirtyDaysAgo);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col" data-id="ha8a7xffl" data-path="src/pages/DashboardPage.tsx">
      <NavBar />

      <main className="flex-1 container mx-auto py-8 px-4" data-id="7nhlrhrth" data-path="src/pages/DashboardPage.tsx">
        <div className="mb-8 flex justify-between items-center" data-id="2s028zqof" data-path="src/pages/DashboardPage.tsx">
          <div data-id="35wkql3x8" data-path="src/pages/DashboardPage.tsx">
            <h1 className="text-3xl font-bold" data-id="j6ru8eyy1" data-path="src/pages/DashboardPage.tsx">Dashboard</h1>
            <p className="text-gray-500" data-id="587dg7vqt" data-path="src/pages/DashboardPage.tsx">
              {isAdmin ?
              'Manage and monitor all complaints' :
              isAgency ?
              'Manage complaints assigned to your agency' :
              'Track and manage your complaints'}
            </p>
          </div>
          
          <Link to="/submit">
            <Button>
              {isAdmin ? 'Create Complaint' : 'Submit New Complaint'}
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8" data-id="avqkl8iu9" data-path="src/pages/DashboardPage.tsx">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Total Complaints</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold" data-id="obm72f7fn" data-path="src/pages/DashboardPage.tsx">{totalComplaints}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Active Complaints</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold" data-id="ywt14o91x" data-path="src/pages/DashboardPage.tsx">{activeComplaints.length}</div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">Resolution Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold" data-id="o6b7rb57h" data-path="src/pages/DashboardPage.tsx">{resolutionRate}%</div>
            </CardContent>
          </Card>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full md:w-auto md:inline-flex grid-cols-3 md:grid-cols-none h-auto">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="recent">Recent</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="mt-6">
            <div className="grid gap-6" data-id="f507al0co" data-path="src/pages/DashboardPage.tsx">
              <Card>
                <CardHeader>
                  <CardTitle>Status Breakdown</CardTitle>
                  <CardDescription>Number of complaints by status</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4" data-id="vngzf9wom" data-path="src/pages/DashboardPage.tsx">
                    {Object.entries(statusCounts).map(([status, count]) =>
                    <div key={status} className="flex items-center space-x-2" data-id="or8f6rfn8" data-path="src/pages/DashboardPage.tsx">
                        <div className={`w-3 h-3 rounded-full bg-blue-${300 + Object.keys(statusCounts).indexOf(status) * 100}`} data-id="qdypru3d9" data-path="src/pages/DashboardPage.tsx"></div>
                        <div className="space-y-1" data-id="2jime5zuu" data-path="src/pages/DashboardPage.tsx">
                          <p className="text-sm font-medium capitalize" data-id="y04xtpia2" data-path="src/pages/DashboardPage.tsx">{status.replace('_', ' ')}</p>
                          <p className="text-2xl font-bold" data-id="btaeef140" data-path="src/pages/DashboardPage.tsx">{count}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
              
              <ComplaintList
                complaints={isAdmin ? complaints : isAgency ? complaints.filter((c) => c.assignedToAgencyId === user?.id) : userComplaints}
                title={isAdmin ? "All Complaints" : "Your Complaints"} />

            </div>
          </TabsContent>
          
          <TabsContent value="active" className="mt-6">
            <ComplaintList
              complaints={activeComplaints}
              title="Active Complaints" />

          </TabsContent>
          
          <TabsContent value="recent" className="mt-6">
            <ComplaintList
              complaints={recentComplaints}
              title="Recent Complaints" />

          </TabsContent>
        </Tabs>

        <h1 className="text-3xl font-bold mb-8 mt-8">COVID-19 Global Dashboard</h1>
        
        {/* Global Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <GlobalStatsCard
            title="Total Cases"
            value={globalStats?.totalCases}
            isLoading={isLoadingGlobal}
          />
          <GlobalStatsCard
            title="Total Deaths"
            value={globalStats?.totalDeaths}
            isLoading={isLoadingGlobal}
          />
          <GlobalStatsCard
            title="Total Recovered"
            value={globalStats?.totalRecovered}
            isLoading={isLoadingGlobal}
          />
          <GlobalStatsCard
            title="Active Cases"
            value={globalStats?.activeCases}
            isLoading={isLoadingGlobal}
          />
        </div>

        {/* Country Selection and World Map */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Select Country</CardTitle>
              </CardHeader>
              <CardContent>
                <CountrySelector
                  countries={allCountries || []}
                  selectedCountry={selectedCountry}
                  onSelect={setSelectedCountry}
                  isLoading={isLoadingCountries}
                />
              </CardContent>
            </Card>
          </div>
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Global Spread</CardTitle>
              </CardHeader>
              <CardContent>
                <WorldMap
                  countries={allCountries || []}
                  selectedCountry={selectedCountry}
                  onSelectCountry={setSelectedCountry}
                  isLoading={isLoadingCountries}
                />
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Time Series and Vaccination Data */}
        <Tabs defaultValue="timeSeries" className="mb-8">
          <TabsList>
            <TabsTrigger value="timeSeries">Time Series</TabsTrigger>
            <TabsTrigger value="vaccination">Vaccination</TabsTrigger>
            <TabsTrigger value="comparison">Country Comparison</TabsTrigger>
          </TabsList>
          
          <TabsContent value="timeSeries">
            <Card>
              <CardHeader>
                <CardTitle>COVID-19 Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <TimeSeriesChart
                  data={timeSeriesData || []}
                  isLoading={isLoadingTimeSeries}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="vaccination">
            <Card>
              <CardHeader>
                <CardTitle>Vaccination Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <VaccinationChart
                  data={vaccinationData || []}
                  isLoading={isLoadingVaccination}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="comparison">
            <Card>
              <CardHeader>
                <CardTitle>Country Comparison</CardTitle>
              </CardHeader>
              <CardContent>
                <CountryComparison
                  countries={allCountries || []}
                  isLoading={isLoadingCountries}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>);

};

export default DashboardPage;