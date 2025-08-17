import React, { useState } from 'react';
import { ErrorBoundary } from './components/ErrorBoundary';
import LandingPage from './components/LandingPage';
import AdminDashboard from './components/AdminDashboard';
import OrganizationsDashboard from './components/OrganizationsDashboard';
import FamiliesDashboard from './components/FamiliesDashboard';
import { ErrorConsole } from './components/ErrorConsole';
import { Bug } from 'lucide-react';

type PageType = 'landing' | 'admin' | 'organizations' | 'families';

function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('landing');
  const [showErrorConsole, setShowErrorConsole] = useState(false);

  const handleNavigateTo = (page: string) => {
    setCurrentPage(page as PageType);
  };

  const handleNavigateBack = () => {
    setCurrentPage('landing');
  };

  return (
    <ErrorBoundary componentName="App">
      <div className="min-h-screen">
        {currentPage === 'landing' && (
          <ErrorBoundary componentName="LandingPage">
            <LandingPage onNavigateTo={handleNavigateTo} />
          </ErrorBoundary>
        )}
        {currentPage === 'admin' && (
          <ErrorBoundary componentName="AdminDashboard">
            <AdminDashboard onNavigateBack={handleNavigateBack} />
          </ErrorBoundary>
        )}
        {currentPage === 'organizations' && (
          <ErrorBoundary componentName="OrganizationsDashboard">
            <OrganizationsDashboard onNavigateBack={handleNavigateBack} />
          </ErrorBoundary>
        )}
        {currentPage === 'families' && (
          <ErrorBoundary componentName="FamiliesDashboard">
            <FamiliesDashboard onNavigateBack={handleNavigateBack} />
          </ErrorBoundary>
        )}
        
        {/* زر فتح وحدة تحكم الأخطاء */}
        {process.env.NODE_ENV === 'development' && (
          <>
            <button
              onClick={() => setShowErrorConsole(true)}
              className="fixed bottom-4 left-4 bg-red-600 text-white p-3 rounded-full shadow-lg hover:bg-red-700 transition-colors z-40"
              title="فتح وحدة تحكم الأخطاء"
            >
              <Bug className="w-5 h-5" />
            </button>
            
            <ErrorConsole 
              isOpen={showErrorConsole} 
              onClose={() => setShowErrorConsole(false)} 
            />
          </>
        )}
      </div>
    </ErrorBoundary>
  );
}

export default App;