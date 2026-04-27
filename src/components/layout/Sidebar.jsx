import {
  LayoutDashboard, CalendarDays, ClipboardList, MapPin,
  Camera, CreditCard, BarChart2, RefreshCw, Image,
  StickyNote, LogOut, ChevronRight,
} from 'lucide-react';

const CUSTOMER_NAV = [
  { icon: LayoutDashboard, label: 'Overview',         view: 'overview' },
  { icon: CalendarDays,    label: 'Book Appointment', view: 'book'     },
  { icon: ClipboardList,   label: 'Service History',  view: 'history'  },
  { icon: MapPin,          label: 'Track Repair',     view: 'track'    },
  { icon: Camera,          label: 'Upload Images',    view: 'upload'   },
  { icon: CreditCard,      label: 'Payment',          view: 'payment'  },
];

const ADMIN_NAV = [
  { icon: BarChart2,    label: 'Analytics',        view: 'overview'  },
  { icon: CalendarDays, label: 'Manage Bookings',  view: 'bookings'  },
  { icon: RefreshCw,    label: 'Update Status',    view: 'status'    },
  { icon: Image,        label: 'Before / After',   view: 'photos'    },
  { icon: StickyNote,   label: 'Technician Notes', view: 'notes'     },
];

export default function Sidebar({ role, user, activeView, onChangeView, onLogout }) {
  const navItems = role === 'admin' ? ADMIN_NAV : CUSTOMER_NAV;
  const initials = user?.name
    ?.split(' ')
    .map(w => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase() ?? 'U';

  return (
    <aside className="w-60 bg-gray-900 border-r border-gray-800 flex flex-col shrink-0
      sticky top-0 h-screen overflow-y-auto">

      {/* Logo strip */}
      <div className="h-[70px] flex items-center px-4 border-b border-gray-800 shrink-0">
        <div className="flex items-center gap-2">
          <div className="bg-brand-700 px-2.5 py-1.5 rounded-lg">
            <span className="text-white font-extrabold text-xs tracking-wide">ESC</span>
          </div>
          <div>
            <p className="text-white font-extrabold text-xs leading-tight">Escalante</p>
            <p className="text-gray-500 text-[10px]">Auto Repair</p>
          </div>
        </div>
      </div>

      {/* User */}
      <div className="px-4 py-5 border-b border-gray-800">
        <div className="w-11 h-11 rounded-full bg-brand-700 flex items-center justify-center
          font-bold text-white text-sm mb-3">
          {initials}
        </div>
        <p className="text-white font-semibold text-sm leading-tight truncate">
          {user?.name ?? 'User'}
        </p>
        <p className="text-red-400 text-[11px] uppercase tracking-widest mt-0.5">
          {role === 'admin' ? 'Mechanic · Admin' : 'Customer'}
        </p>
      </div>

      {/* Nav items */}
      <nav className="flex-1 py-3">
        {navItems.map(({ icon: Icon, label, view }) => {
          const active = activeView === view;
          return (
            <button
              key={view}
              onClick={() => onChangeView(view)}
              className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium
                transition-all duration-150 border-l-[3px] group
                ${active
                  ? 'border-brand-700 bg-red-900/20 text-white'
                  : 'border-transparent text-gray-400 hover:text-white hover:bg-gray-800/60'}`}
            >
              <Icon
                className={`w-[18px] h-[18px] shrink-0 transition-colors
                  ${active ? 'text-red-400' : 'text-gray-500 group-hover:text-gray-300'}`}
                strokeWidth={1.75}
              />
              <span className="truncate">{label}</span>
              {active && <ChevronRight className="w-3.5 h-3.5 ml-auto text-red-500 shrink-0" />}
            </button>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-gray-800">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm
            text-gray-500 border border-gray-700 hover:border-brand-700 hover:text-red-400
            transition-all duration-150"
        >
          <LogOut className="w-4 h-4" strokeWidth={1.75} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}