import { Phone, MapPin, MessageCircle } from 'lucide-react';

const LINKS = ['home', 'services', 'about', 'contact'];

export default function Footer({ onNavigate }) {
  return (
    <footer className="bg-gray-950 border-t border-gray-800 py-12 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="bg-brand-700 px-2.5 py-1.5 rounded-lg">
              <span className="text-white font-extrabold text-xs">ESC</span>
            </div>
            <div>
              <p className="text-white font-bold text-sm">Escalante Auto Repair</p>
              <p className="text-gray-500 text-xs">Utah's Trusted Mechanics</p>
            </div>
          </div>
          <p className="text-gray-500 text-sm leading-relaxed">
            Honest, affordable, and high-quality auto repair for every vehicle.
          </p>
        </div>

        {/* Quick links */}
        <div>
          <h4 className="text-white font-bold text-sm mb-4">Quick Links</h4>
          <div className="flex flex-col gap-2">
            {LINKS.map(p => (
              <button key={p} onClick={() => onNavigate(p)}
                className="text-gray-500 hover:text-red-400 text-sm capitalize text-left transition-colors w-fit">
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-white font-bold text-sm mb-4">Contact</h4>
          <div className="flex flex-col gap-3">
            <a href="tel:+14352338048"
              className="flex items-center gap-2 text-gray-500 hover:text-red-400 text-sm transition-colors">
              <Phone className="w-4 h-4 shrink-0" /> 435-233-8048
            </a>
            <a href="https://maps.app.goo.gl/ckFp17UG6B5LYCD28" target="_blank" rel="noreferrer"
              className="flex items-center gap-2 text-gray-500 hover:text-red-400 text-sm transition-colors">
              <MapPin className="w-4 h-4 shrink-0" /> Utah, USA
            </a>
            <a href="https://wa.me/14352338048" target="_blank" rel="noreferrer"
              className="flex items-center gap-2 text-gray-500 hover:text-red-400 text-sm transition-colors">
              <MessageCircle className="w-4 h-4 shrink-0" /> WhatsApp
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-8 pt-6 border-t border-gray-800
        text-center text-gray-600 text-xs">
        © 2026 Escalante Auto Repair. All rights reserved.
      </div>
    </footer>
  );
}