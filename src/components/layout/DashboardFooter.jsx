import { Phone, MapPin, MessageCircle } from 'lucide-react';
import defaultLogo from '../../assets/logo.png';

/* Compact footer for the Customer Portal. Mirrors the public Footer brand
   style but is lighter (less vertical padding) and its quick links jump
   between dashboard views instead of leaving to the public site. */

const QUICK_LINKS = [
  { label: 'Overview',       view: 'overview' },
  { label: 'Book Appointment', view: 'book'   },
  { label: 'Track Repair',   view: 'track'    },
  { label: 'Payment',        view: 'payment'  },
];

export default function DashboardFooter({ onChangeView, logo }) {
  return (
    <footer className="bg-gray-950 border-t border-gray-800 px-4 sm:px-6 py-8 sm:py-10">
      <div className="max-w-5xl mx-auto grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <img
              src={logo || defaultLogo}
              alt="Escalante Auto Repair"
              className="h-9 w-auto max-w-[110px] object-contain rounded-lg"
            />
            <div>
              <p className="text-white font-bold text-sm leading-tight">Escalante Auto Repair</p>
              <p className="text-gray-500 text-xs">Utah's Trusted Mechanics</p>
            </div>
          </div>
          <p className="text-gray-500 text-sm leading-relaxed">
            Honest, affordable, and high-quality auto repair for every vehicle.
          </p>
        </div>

        {/* Quick links */}
        <div>
          <h4 className="text-white font-bold text-sm mb-3">Quick Links</h4>
          <div className="flex flex-col gap-2">
            {QUICK_LINKS.map(({ label, view }) => (
              <button
                key={view}
                onClick={() => onChangeView?.(view)}
                className="text-gray-500 hover:text-red-400 text-sm text-left transition-colors w-fit"
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-white font-bold text-sm mb-3">Contact</h4>
          <div className="flex flex-col gap-3">
            <a
              href="tel:+14352338048"
              className="flex items-center gap-2 text-gray-500 hover:text-red-400 text-sm transition-colors"
            >
              <Phone className="w-4 h-4 shrink-0" /> 435-233-8048
            </a>
            <a
              href="https://maps.app.goo.gl/ckFp17UG6B5LYCD28"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-gray-500 hover:text-red-400 text-sm transition-colors"
            >
              <MapPin className="w-4 h-4 shrink-0" /> Utah, USA
            </a>
            <a
              href="https://wa.me/14352338048"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-gray-500 hover:text-red-400 text-sm transition-colors"
            >
              <MessageCircle className="w-4 h-4 shrink-0" /> WhatsApp
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto mt-8 pt-5 border-t border-gray-800
        text-center text-gray-600 text-xs">
        © 2026 Escalante Auto Repair. All rights reserved.
      </div>
    </footer>
  );
}
