import { useState, useEffect } from 'react';
import { useAuth } from './hooks/useAuth';
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

const LOGO_KEY = 'esc_logo';

export default function App() {
  // ── Auth comes from context — no local user state needed ──────────────────
  const { user, logout } = useAuth();

  const [currentPage, setCurrentPage] = useState('home');
  const { message, showToast }        = useToast();
  const bookingsApi                   = useBookings();

  // ── Logo — persisted in localStorage so it survives page refreshes ────────
  const [logo, setLogoState] = useState(() => {
    try { return localStorage.getItem(LOGO_KEY) || null; } catch { return null; }
  });
  function setLogo(dataUrl) {
    setLogoState(dataUrl);
    try {
      if (dataUrl) localStorage.setItem(LOGO_KEY, dataUrl);
      else         localStorage.removeItem(LOGO_KEY);
    } catch { /* storage full */ }
  }

  // Enforce dark mode globally (as per your architectural decision)
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  // If a session was restored from localStorage on load and we're on a public
  // page, stay there — don't auto-redirect. Only redirect after an explicit login.
  function handleLogin() {
    setCurrentPage('dashboard');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleLogout() {
    logout();                    // clears AuthContext + localStorage session
    setCurrentPage('home');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleNavigate(page) {
    // If the user clicks "Portal" while already logged in → go straight to dashboard
    if (page === 'portal' && user) {
      setCurrentPage('dashboard');
    } else {
      setCurrentPage(page);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const showPublicLayout = PUBLIC_PAGES.includes(currentPage);

  return (
    <div className="min-h-screen bg-gray-950 text-white transition-colors duration-200">

      {showPublicLayout && (
        <Navbar currentPage={currentPage} onNavigate={handleNavigate} logo={logo} />
      )}

      <div className={showPublicLayout ? 'pt-[70px]' : ''}>
        {currentPage === 'home'      && <Home      onNavigate={handleNavigate} />}
        {currentPage === 'services'  && <Services  onNavigate={handleNavigate} />}
        {currentPage === 'about'     && <About />}
        {currentPage === 'contact'   && <Contact   showToast={showToast} />}
        {currentPage === 'portal'    && <Portal    onLogin={handleLogin} />}
        {currentPage === 'dashboard' && (
          <Dashboard
            user={user}
            onLogout={handleLogout}
            onNavigate={handleNavigate}
            showToast={showToast}
            bookingsApi={bookingsApi}
            logo={logo}
            setLogo={setLogo}
          />
        )}
      </div>

      {showPublicLayout && <Footer onNavigate={handleNavigate} />}
      {showPublicLayout && <FloatingButtons />}
      <Toast message={message} />
    </div>
  );
}