import { useLanguage } from '@/context/language-context';
import NavBar from '@/components/NavBar';

const AboutPage = () => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <NavBar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden">
          {/* Newspaper Header */}
          <div className="border-b-4 border-gray-800 dark:border-gray-600 p-6 text-center">
            <h1 className="text-4xl font-serif font-bold mb-2">The Daily Chronicle</h1>
            <p className="text-gray-600 dark:text-gray-400">Special COVID-19 Edition</p>
            <p className="text-sm text-gray-500 dark:text-gray-500 mt-2">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>

          {/* Main Content */}
          <div className="p-6">
            <h2 className="text-3xl font-serif font-bold mb-4">COVID-19 in Kenya: A Timeline of Events</h2>
            
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-lg mb-6">
                Kenya's battle with COVID-19 began on March 13, 2020, when the first case was confirmed in Nairobi. 
                The country's response to the pandemic has been marked by both challenges and innovative solutions.
              </p>

              <h3 className="text-2xl font-serif font-bold mt-8 mb-4">Key Milestones</h3>
              
              <div className="space-y-6">
                <div className="border-l-4 border-blue-600 pl-4">
                  <h4 className="font-bold">March 2020</h4>
                  <p>First case confirmed in Kenya. Government implements initial containment measures including travel restrictions and school closures.</p>
                </div>

                <div className="border-l-4 border-blue-600 pl-4">
                  <h4 className="font-bold">April 2020</h4>
                  <p>Nationwide curfew implemented. First COVID-19 testing laboratory established at the Kenya Medical Research Institute (KEMRI).</p>
                </div>

                <div className="border-l-4 border-blue-600 pl-4">
                  <h4 className="font-bold">June 2020</h4>
                  <p>Gradual reopening of the economy begins. Introduction of the "Wearing is Caring" campaign to promote mask usage.</p>
                </div>

                <div className="border-l-4 border-blue-600 pl-4">
                  <h4 className="font-bold">March 2021</h4>
                  <p>Vaccination campaign begins with healthcare workers and frontline personnel as priority groups.</p>
                </div>

                <div className="border-l-4 border-blue-600 pl-4">
                  <h4 className="font-bold">2022</h4>
                  <p>Kenya achieves significant progress in vaccination coverage and implements innovative digital solutions for contact tracing.</p>
                </div>
              </div>

              <h3 className="text-2xl font-serif font-bold mt-8 mb-4">Impact and Response</h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <h4 className="font-bold mb-2">Healthcare System</h4>
                  <p>Rapid expansion of ICU capacity and establishment of isolation centers across the country. Training of healthcare workers in COVID-19 management.</p>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <h4 className="font-bold mb-2">Economic Impact</h4>
                  <p>Implementation of economic stimulus packages and support for vulnerable populations. Focus on maintaining essential services and food security.</p>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <h4 className="font-bold mb-2">Education</h4>
                  <p>Innovative approaches to remote learning, including radio and TV-based education programs for students without internet access.</p>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                  <h4 className="font-bold mb-2">Community Response</h4>
                  <p>Strong community engagement in prevention measures. Local innovations in handwashing stations and mask production.</p>
                </div>
              </div>

              <h3 className="text-2xl font-serif font-bold mt-8 mb-4">Current Status</h3>
              
              <p className="mb-6">
                As of 2024, Kenya has made significant progress in managing the pandemic through a combination of vaccination efforts, 
                public health measures, and community engagement. The country continues to monitor new variants and maintain 
                healthcare system readiness while focusing on economic recovery and social well-being.
              </p>

              <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-lg mt-8">
                <h4 className="font-bold mb-2">Key Statistics</h4>
                <ul className="list-disc list-inside space-y-2">
                  <li>Total Cases: Over 340,000</li>
                  <li>Recoveries: Over 330,000</li>
                  <li>Vaccination Coverage: Over 30% of population</li>
                  <li>Healthcare Facilities: Over 200 COVID-19 treatment centers</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Newspaper Footer */}
          <div className="border-t-4 border-gray-800 dark:border-gray-600 p-6 text-center text-sm text-gray-600 dark:text-gray-400">
            <p>© {new Date().getFullYear()} The Daily Chronicle. All rights reserved.</p>
            <p className="mt-2">Data sourced from Kenya Ministry of Health and World Health Organization</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AboutPage; 