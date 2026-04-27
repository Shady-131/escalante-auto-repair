import { useState } from 'react';
import { Phone, CalendarDays, Moon, Sun, Menu, X, Wrench } from 'lucide-react';
import Button from '../ui/Button';

const NAV_LINKS = [
  { label: 'Home',     page: 'home'     },
  { label: 'Services', page: 'services' },
  { label: 'About',    page: 'about'    },
  { label: 'Contact',  page: 'contact'  },
];

export default function Navbar({ currentPage, onNavigate, darkMode, onToggleDark }) {
  const [menuOpen, setMenuOpen] = useState(false);

  function go(page) {
    onNavigate(page);
    setMenuOpen(false);
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-950/97 backdrop-blur-md
      border-b-2 border-brand-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-[70px]">

        {/* Logo */}
        <button onClick={() => go('home')} className="flex items-center gap-2.5 group">
          <div className="bg-brand-700 group-hover:bg-brand-800 transition-colors
            px-3 py-1.5 rounded-lg flex items-center gap-1.5">
            <Wrench className="w-4 h-4 text-white" strokeWidth={2.5} />
            <span className="text-white font-extrabold text-sm tracking-wide">ESCALANTE</span>
          </div>
          <div className="hidden sm:block text-left">
            <div className="text-gray-400 text-[11px] uppercase tracking-widest leading-tight">
              Auto Repair · Utah
            </div>
          </div>
        </button>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-7">
          {NAV_LINKS.map(({ label, page }) => (
            <li key={page}>
              <button
                onClick={() => go(page)}
                className={`text-sm font-medium uppercase tracking-wide transition-colors duration-150
                  ${currentPage === page
                    ? 'text-red-400'
                    : 'text-gray-400 hover:text-red-400'}`}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={onToggleDark}
            aria-label="Toggle dark mode"
            className="p-2 rounded-lg border border-gray-700 text-gray-400
              hover:border-brand-700 hover:text-red-400 transition-all duration-150"
          >
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <Button variant="ghost" size="sm" onClick={() => go('portal')}>
            Login
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={() => go('portal')}
            className="hidden sm:inline-flex"
          >
            <CalendarDays className="w-4 h-4" />
            Book Now
          </Button>

          <button
            className="md:hidden p-2 text-gray-400 hover:text-white transition-colors"
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {menuOpen && (
        <div className="md:hidden bg-gray-950 border-t border-gray-800 px-4 py-4 flex flex-col gap-2">
          {NAV_LINKS.map(({ label, page }) => (
            <button
              key={page}
              onClick={() => go(page)}
              className="text-left text-sm text-gray-300 hover:text-red-400 py-2
                border-b border-gray-800/50 transition-colors"
            >
              {label}
            </button>
          ))}
          <div className="pt-2 flex flex-col gap-2">
            <Button variant="ghost" size="sm" onClick={() => go('portal')}>Login</Button>
            <Button variant="primary" size="sm" onClick={() => go('portal')}>
              <CalendarDays className="w-4 h-4" /> Book Now
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
}