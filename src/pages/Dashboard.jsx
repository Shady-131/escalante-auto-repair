import { useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import Sidebar from '../components/layout/Sidebar';
import AdminDashboard from './dashboard/AdminDashboard';
import CustomerDashboard from './dashboard/CustomerDashboard';

export default function Dashboard({ user, onLogout, onNavigate, showToast, bookingsApi, darkMode, onToggleDark }) {
  const isAdmin = user?.role === 'admin';
  const [activeView, setActiveView] = useState(isAdmin ? 'overview' : 'overview');

  return (
    <div className="flex min-h-screen bg-gray-950">
      <Sidebar
        role={user?.role}
        user={user}
        activeView={activeView}
        onChangeView={setActiveView}
        onLogout={onLogout}
      />

      <div className="flex-1 flex flex-col min-w-0">
        {/* Dashboard top bar */}
        <header className="sticky top-0 z-40 bg-gray-950/95 backdrop-blur-md border-b border-gray-800
          flex items-center justify-between px-6 h-[70px]">
          <div>
            <h1 className="text-white font-extrabold text-base leading-tight">
              {isAdmin ? 'Admin Dashboard' : 'Customer Portal'}
            </h1>
            <p className="text-gray-500 text-xs">
              Welcome back, <span className="text-red-400 font-semibold">{user?.name}</span>
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('home')}
              className="text-xs text-gray-500 hover:text-red-400 transition-colors border border-gray-700
                hover:border-brand-700 rounded-lg px-3 py-1.5 font-medium"
            >
              ← Back to Site
            </button>
            <button
              onClick={onToggleDark}
              aria-label="Toggle dark mode"
              className="p-2 rounded-lg border border-gray-700 text-gray-400
                hover:border-brand-700 hover:text-red-400 transition-all duration-150"
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 bg-gray-950">
          {isAdmin
            ? <AdminDashboard activeView={activeView} bookingsApi={bookingsApi} showToast={showToast} />
            : <CustomerDashboard activeView={activeView} user={user} bookingsApi={bookingsApi} showToast={showToast} />
          }
        </main>
      </div>
    </div>
  );
}