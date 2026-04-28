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
  const [currentPage, setCurrentPage] = useState('home');
  // خلينا اليوزر الافتراضي Customer عشان يفتح عليه أول ما تعمل Login
  const [user, setUser] = useState({ role: 'customer', name: 'John Doe' }); 
  const { message, showToast } = useToast();
  const bookingsApi = useBookings();

  // إجبار الموقع كله إنه يشتغل على الـ Dark Mode دايماً
  useEffect(() => {
    document.documentElement.classList.add('dark');
    localStorage.setItem('theme', 'dark');
  }, []);

  function handleLogin(userData) {
    // لو مفيش داتا مبعوتة، هيدخل كعميل كحالة افتراضية
    setUser(userData || { role: 'customer', name: 'John Doe' });
    setCurrentPage('dashboard');
  }

  function handleLogout() {
    setUser(null);
    setCurrentPage('home');
  }

  function handleNavigate(page) {
    if (page === 'portal') {
      setCurrentPage('dashboard');
    } else {
      setCurrentPage(page);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // الدالة السحرية للتبديل بين الأدوار
  function toggleRole() {
    setUser(prev => ({
      ...prev,
      role: prev?.role === 'admin' ? 'customer' : 'admin',
      name: prev?.role === 'admin' ? 'John Doe' : 'Mechanic Team'
    }));
  }

  const showPublicLayout = PUBLIC_PAGES.includes(currentPage);

  return (
    <div className="min-h-screen bg-gray-950 text-white transition-colors duration-200">
      {showPublicLayout && (
        <Navbar
          currentPage={currentPage}
          onNavigate={handleNavigate}
        />
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
            onToggleRole={toggleRole} // بعتنا الدالة للداشبورد
          />
        )}
      </div>

      {showPublicLayout && <Footer onNavigate={handleNavigate} />}
      {showPublicLayout && <FloatingButtons />}
      <Toast message={message} />
    </div>
  );
}