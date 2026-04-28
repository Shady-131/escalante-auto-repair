import { useState } from 'react';
import { Menu, X, Wrench } from 'lucide-react';

const NAV_LINKS = [
  { label: 'Home',     page: 'home'     },
  { label: 'Services', page: 'services' },
  { label: 'About',    page: 'about'    },
  { label: 'Contact',  page: 'contact'  },
];

export default function Navbar({ currentPage, onNavigate }) {
  const [menuOpen, setMenuOpen] = useState(false);

  function go(page) {
    if (page === 'portal') {
      onNavigate('dashboard');
    } else {
      onNavigate(page);
    }
    setMenuOpen(false);
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-[70px]
      bg-gray-950/95 backdrop-blur-md border-b border-gray-800">

      <div className="max-w-7xl mx-auto h-full px-6 flex items-center justify-between">
        
        <button onClick={() => go('home')} className="flex items-center gap-2">
          <div className="bg-red-600 px-2.5 py-1.5 rounded-lg">
            <span className="text-white font-extrabold text-xs tracking-wide">ESC</span>
          </div>
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

        <div className="flex items-center gap-3">
          
          <button
            onClick={() => go('portal')}
            className="flex items-center gap-2 px-4 py-2 bg-white 
              text-gray-900 text-sm font-medium rounded-lg 
              hover:bg-gray-100 transition-colors"
          >
            <Wrench className="w-4 h-4" />
            <span className="hidden sm:inline">Portal</span>
          </button>

          <button
            className="md:hidden p-2 text-gray-400 hover:bg-gray-800 rounded-lg"
            onClick={() => setMenuOpen(m => !m)}
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </header>
  );
}