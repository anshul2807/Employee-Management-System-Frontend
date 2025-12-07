import './App.css'
import { HashRouter } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import AppRouter from './routes/AppRouter';
import Header from './components/common/Header';
import Sidebar from './components/common/Sidebar';
import LoadingSpinner from './components/common/LoadingSpinner';
import { useState } from 'react';

const App = () => {
  const { isAuthenticated, loading } = useAuth();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const closeSidebar = () => setSidebarOpen(false);

  if (loading) {
    return <LoadingSpinner />;
  }

  const layout = isAuthenticated ? (
    <div className="flex h-screen bg-gray-100">
      <Sidebar isOpen={sidebarOpen} closeSidebar={closeSidebar} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header toggleSidebar={toggleSidebar} />
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 md:p-6">
          <AppRouter />
        </main>
      </div>
    </div>
  ) : (
    <AppRouter />
  );

  return (
    <HashRouter>
      {layout}
    </HashRouter>
  );
};

export default App;
