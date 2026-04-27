import { useState, useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import FloatingButtons from './components/floating/FloatingButtons';
import Toast from './components/ui/Toast';
import Home from './pages/Home';
import Services from './pages/Services';
import About from './pages/About';
import Contact from './pages/Contact';
import Portal from './pages/Portal';
import Dashboard from './pages/Dashboard';
import { useToast } from './hooks/useToast';
import { useBookings } from './hooks/useBookings';

const PUBLIC_PAGES = ['home', 'services', 'about', 'contact', 'portal'];

export default function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [currentPage, setCurrentPage] = useState('home');
  const [user, setUser] = useState(null);
  const { message, showToast } = useToast();
  const bookingsApi = useBookings();

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  function handleLogin(userData) {
    setUser(userData);
    setCurrentPage('dashboard');
  }

  function handleLogout() {
    setUser(null);
    setCurrentPage('home');
  }

  function handleNavigate(page) {
    if (page === 'portal' && user) {
      setCurrentPage('dashboard');
    } else {
      setCurrentPage(page);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const isPortalPage = currentPage === 'dashboard';
  const showPublicLayout = PUBLIC_PAGES.includes(currentPage);

  return (
    <div className={`min-h-screen bg-white dark:bg-gray-950 text-gray-900 dark:text-white transition-colors duration-200`}>
      {showPublicLayout && (
        <Navbar
          currentPage={currentPage}
          onNavigate={handleNavigate}
          darkMode={darkMode}
          onToggleDark={() => setDarkMode(d => !d)}
        />
      )}

      <div className={showPublicLayout ? 'pt-[70px]' : ''}>
        {currentPage === 'home'      && <Home onNavigate={handleNavigate} />}
        {currentPage === 'services'  && <Services onNavigate={handleNavigate} />}
        {currentPage === 'about'     && <About />}
        {currentPage === 'contact'   && <Contact showToast={showToast} />}
        {currentPage === 'portal'    && <Portal onLogin={handleLogin} />}
        {currentPage === 'dashboard' && (
          <Dashboard
            user={user}
            onLogout={handleLogout}
            onNavigate={handleNavigate}
            showToast={showToast}
            bookingsApi={bookingsApi}
            darkMode={darkMode}
            onToggleDark={() => setDarkMode(d => !d)}
          />
        )}
      </div>

      {showPublicLayout && <Footer onNavigate={handleNavigate} />}
      {showPublicLayout && <FloatingButtons />}
      <Toast message={message} />
    </div>
  );
}