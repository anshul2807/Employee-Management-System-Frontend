import './App.css'
import { HashRouter } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import AppRouter from './routes/AppRouter';
import Header from './components/common/Header';
import Sidebar from './components/common/Sidebar';
import LoadingSpinner from './components/common/LoadingSpinner';

const App = () => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  // The main layout structure for the dashboard
  const layout = isAuthenticated ? (
    <div className="flex h-screen bg-gray-100">
      <Sidebar /> 
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-x-hidden overflow-y-auto p-4 md:p-6">
          <AppRouter />
        </main>
      </div>
    </div>
  ) : (
    // No layout wrapper for public pages (Login, NotFound)
    <AppRouter />
  );

  return (
    <HashRouter>
          {layout}
    </HashRouter>
  );
};

export default App;
