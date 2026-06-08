import { useState } from 'react';
import { Menu, X, LogIn } from 'lucide-react';
import defaultLogo from '../../assets/logo.png';

const NAV_LINKS = [
  { label: 'Home',     page: 'home'     },
  { label: 'Services', page: 'services' },
  { label: 'About',    page: 'about'    },
  { label: 'Contact',  page: 'contact'  },
];

export default function Navbar({ currentPage, onNavigate, logo }) {
  const [menuOpen, setMenuOpen] = useState(false);

  function go(page) {
    onNavigate(page);
    setMenuOpen(false);
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50
      bg-gray-950/95 backdrop-blur-md border-b border-gray-800">

      {/* Main bar */}
      <div className="max-w-7xl mx-auto h-[70px] px-4 sm:px-6 flex items-center justify-between">

        <button onClick={() => go('home')} className="flex items-center gap-2">
          {/* Admin-uploaded logo overrides the default; otherwise use the brand logo asset */}
          <img
            src={logo || defaultLogo}
            alt="Escalante Auto Repair"
            className="h-10 w-auto max-w-[120px] object-contain rounded-lg"
          />
          <div className="hidden sm:block text-left">
            <p className="text-white font-extrabold text-sm leading-tight">Escalante</p>
            <p className="text-gray-500 text-[10px]">Auto Repair</p>
          </div>
        </button>

        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map(({ label, page }) => (
            <button
              key={page}
              onClick={() => go(page)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
                ${currentPage === page
                  ? 'text-red-400 bg-red-900/20'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
            >
              {label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => go('portal')}
            className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-white
              text-gray-900 text-sm font-medium rounded-lg
              hover:bg-gray-100 transition-colors"
          >
            <LogIn className="w-4 h-4" />
            <span>Sign In</span>
          </button>

          <button
            className="md:hidden p-2 text-gray-400 hover:bg-gray-800 rounded-lg"
            onClick={() => setMenuOpen(m => !m)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown — overlays page content, positioned just below the bar */}
      {menuOpen && (
        <nav className="md:hidden absolute top-full left-0 right-0
          bg-gray-900 border-b border-gray-800 shadow-xl
          px-4 py-3 flex flex-col gap-1">
          {NAV_LINKS.map(({ label, page }) => (
            <button
              key={page}
              onClick={() => go(page)}
              className={`w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors
                ${currentPage === page
                  ? 'text-red-400 bg-red-900/20'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }`}
            >
              {label}
            </button>
          ))}
        </nav>
      )}
    </header>
  );
}
