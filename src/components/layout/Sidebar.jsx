import {
  LayoutDashboard, CalendarDays, ClipboardList, MapPin,
  Camera, CreditCard, BarChart2, Image,
  StickyNote, LogOut, ChevronRight, Package, Settings2, Tag, Users,
} from 'lucide-react';
import { isStaffRole, ADMIN_ONLY_VIEWS, roleLabel } from '../../lib/permissions';

const CUSTOMER_NAV = [
  { icon: LayoutDashboard, label: 'Overview',         view: 'overview' },
  { icon: CalendarDays,    label: 'Book Appointment', view: 'book'     },
  { icon: ClipboardList,   label: 'Service History',  view: 'history'  },
  { icon: MapPin,          label: 'Track Repair',     view: 'track'    },
  { icon: Camera,          label: 'Upload Images',    view: 'upload'   },
  { icon: CreditCard,      label: 'Payment',          view: 'payment'  },
];

const ADMIN_NAV = [
  { icon: BarChart2,    label: 'Overview',         view: 'overview'   },
  { icon: Package,      label: 'Spare Parts',      view: 'inventory'  },
  { icon: Image,        label: 'Before / After',   view: 'photos'     },
  { icon: StickyNote,   label: 'Technician Notes', view: 'notes'      },
  { icon: Tag,          label: 'Service Prices',   view: 'service-prices' },
  { icon: Users,        label: 'Staff Management', view: 'staff'      },
  { icon: Settings2,    label: 'Shop Settings',    view: 'settings'   },
];

export default function Sidebar({ role, user, activeView, onChangeView, onLogout, isOpen, onClose, logo }) {
  // Staff see the staff nav; mechanics get it minus the admin-only (business) items.
  const navItems = !isStaffRole(role)
    ? CUSTOMER_NAV
    : role === 'admin'
      ? ADMIN_NAV
      : ADMIN_NAV.filter(item => !ADMIN_ONLY_VIEWS.includes(item.view));
  const initials = user?.name
    ?.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase() ?? 'U';

  return (
    <>
      {/* Mobile backdrop overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      <aside className={`
        fixed inset-y-0 left-0 z-50 w-60
        md:sticky md:top-0 md:z-auto md:h-screen
        bg-gray-900 border-r border-gray-800 flex flex-col shrink-0
        overflow-y-auto transition-transform duration-300 ease-in-out
        md:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>

        {/* Logo */}
        <div className="h-[70px] flex items-center px-4 border-b border-gray-800 shrink-0">
          <div className="flex items-center gap-2">
            {logo
              ? <img src={logo} alt="Escalante Auto Repair" className="h-8 w-auto max-w-[100px] object-contain rounded-lg" />
              : <div className="bg-red-600 px-2.5 py-1.5 rounded-lg">
                  <span className="text-white font-extrabold text-xs tracking-wide">ESC</span>
                </div>
            }
            <div>
              <p className="text-white font-extrabold text-xs leading-tight">Escalante</p>
              <p className="text-gray-500 text-[10px]">Auto Repair</p>
            </div>
          </div>
        </div>

        {/* User info */}
        <div className="px-4 py-5 border-b border-gray-800">
          <div className="w-11 h-11 rounded-full bg-red-600 flex items-center justify-center
            font-bold text-white text-sm mb-3 overflow-hidden">
            {user?.photo
              ? <img src={user.photo} alt={user?.name ?? 'User'} className="w-full h-full object-cover" />
              : initials}
          </div>
          <p className="text-white font-semibold text-sm leading-tight truncate">
            {user?.name ?? 'User'}
          </p>
          <p className="text-red-400 text-[11px] uppercase tracking-widest mt-0.5">
            {roleLabel(role)}
          </p>
        </div>

        {/* Nav */}
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
                    ? 'border-red-600 bg-red-900/20 text-white'
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
              text-gray-500 border border-gray-700
              hover:border-red-600 hover:text-red-400 transition-all duration-150"
          >
            <LogOut className="w-4 h-4" strokeWidth={1.75} />
            Sign Out
          </button>
        </div>
      </aside>
    </>
  );
}
