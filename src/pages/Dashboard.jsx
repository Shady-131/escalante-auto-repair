import { useState } from 'react';
import { Users, Menu } from 'lucide-react';
import Sidebar from '../components/layout/Sidebar';
import DashboardFooter from '../components/layout/DashboardFooter';
import AdminDashboard from './dashboard/AdminDashboard';
import CustomerDashboard from './dashboard/CustomerDashboard';
import { isStaffRole } from '../lib/permissions';

export default function Dashboard({ user, onLogout, onNavigate, showToast, bookingsApi, logo, setLogo }) {
  const realRole = user?.role ?? 'customer';
  // Only real admins may preview the customer view. Mechanics are locked to the
  // staff dashboard; customers can never escalate into a staff dashboard.
  const canSwitchRole = realRole === 'admin';
  const [previewRole,  setPreviewRole]  = useState(realRole);
  const [activeView,   setActiveView]   = useState('overview');
  const [sidebarOpen,  setSidebarOpen]  = useState(false);

  // The effective role drives every gate. Only admins can override it (preview).
  const effectiveRole = canSwitchRole ? previewRole : realRole;
  const isStaff = isStaffRole(effectiveRole);          // mechanic OR admin → staff dashboard
  const isAdmin = effectiveRole === 'admin';

  const handleRoleSwitch = () => {
    if (!canSwitchRole) return;   // guard: only admins can toggle roles
    setPreviewRole(r => (r === 'admin' ? 'customer' : 'admin'));
    setActiveView('overview');
  };

  function handleChangeView(view) {
    setActiveView(view);
    setSidebarOpen(false);   // close drawer on mobile after navigation
  }

  return (
    <div className="flex min-h-screen bg-gray-950">
      <Sidebar
        role={effectiveRole}
        user={user}
        activeView={activeView}
        onChangeView={handleChangeView}
        onLogout={onLogout}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        logo={logo}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <header className="sticky top-0 z-40 bg-gray-950/95 backdrop-blur-md border-b border-gray-800
          flex items-center gap-3 px-4 sm:px-6 h-[70px]">

          {/* Mobile sidebar toggle */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="md:hidden p-2 -ml-1 text-gray-400 hover:bg-gray-800 rounded-lg shrink-0"
            aria-label="Open menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Title */}
          <div className="flex-1 min-w-0">
            <h1 className="text-white font-extrabold text-base leading-tight truncate">
              {!isStaff ? 'Customer Portal' : isAdmin ? 'Admin Dashboard' : 'Mechanic Dashboard'}
            </h1>
            <p className="text-gray-500 text-xs truncate">
              Welcome back, <span className="text-red-400 font-semibold">{user?.name}</span>
            </p>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Role preview is an admin-only convenience — hidden for customers */}
            {canSwitchRole && (
              <button
                onClick={handleRoleSwitch}
                className="flex items-center gap-1.5 px-2 sm:px-3 py-1.5 text-xs font-bold rounded-lg
                  bg-red-900/20 text-red-400 border border-red-900/40 hover:bg-red-900/40 transition-colors"
              >
                <Users className="w-3.5 h-3.5 shrink-0" />
                <span className="hidden sm:inline">View as {isAdmin ? 'Customer' : 'Admin'}</span>
              </button>
            )}

            <button
              onClick={() => onNavigate('home')}
              className="text-xs text-gray-500 hover:text-red-400 transition-colors border border-gray-700
                hover:border-red-600 rounded-lg px-2 sm:px-3 py-1.5 font-medium"
            >
              <span className="sm:hidden">←</span>
              <span className="hidden sm:inline">← Back to Site</span>
            </button>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto bg-gray-950 flex flex-col min-w-0">
          {/* Content grows to fill the viewport so the footer is pushed to the
              bottom on short pages and sits right after content on long ones. */}
          <div className="flex-1 p-4 sm:p-6">
            {isStaff
              ? <AdminDashboard
                  role={effectiveRole}
                  activeView={activeView}
                  onChangeView={handleChangeView}
                  bookingsApi={bookingsApi}
                  showToast={showToast}
                  logo={logo}
                  setLogo={setLogo}
                />
              : <CustomerDashboard
                  activeView={activeView}
                  onChangeView={handleChangeView}
                  user={user}
                  bookingsApi={bookingsApi}
                  showToast={showToast}
                />
            }
          </div>

          {/* Footer is customer-only — the staff dashboard intentionally omits it. */}
          {!isStaff && <DashboardFooter onChangeView={handleChangeView} logo={logo} />}
        </main>
      </div>
    </div>
  );
}
