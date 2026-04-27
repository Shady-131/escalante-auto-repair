import { Phone, MapPin, Wrench } from 'lucide-react';

const FOOTER_SERVICES = [
  'Engine Repair', 'Brake Service', 'Oil Change',
  'AC & Heating', 'Transmission', 'Electrical',
];

export default function Footer({ onNavigate }) {
  return (
    <footer className="bg-gray-950 border-t-2 border-brand-700 text-gray-400">
      <div className="max-w-7xl mx-auto px-6 pt-12 pb-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">

          {/* Brand */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="bg-brand-700 px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                <Wrench className="w-4 h-4 text-white" strokeWidth={2.5} />
                <span className="text-white font-extrabold text-sm">ESCALANTE</span>
              </div>
              <span className="text-white font-semibold text-sm">Auto Repair</span>
            </div>
            <p className="text-sm leading-relaxed mb-4">
              Utah's trusted auto repair shop. Professional, honest, and affordable service for every vehicle.
            </p>
            <div className="flex gap-2">
              {['f', '𝕏', 'in', '⭐'].map((s, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-lg bg-gray-900 border border-gray-800
                    flex items-center justify-center text-sm text-gray-500
                    hover:bg-brand-700 hover:text-white hover:border-brand-700
                    transition-all duration-150"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wide mb-4">Navigation</h4>
            {['home', 'services', 'about', 'contact'].map(p => (
              <button
                key={p}
                onClick={() => onNavigate(p)}
                className="block text-sm mb-2 capitalize hover:text-red-400 transition-colors text-left"
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => onNavigate('portal')}
              className="block text-sm mb-2 hover:text-red-400 transition-colors text-left"
            >
              Customer Portal
            </button>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wide mb-4">Services</h4>
            {FOOTER_SERVICES.map(s => (
              <p key={s} className="text-sm mb-2">{s}</p>
            ))}
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold text-sm uppercase tracking-wide mb-4">Contact</h4>
            <a href="tel:+14352338048"
              className="flex items-center gap-2 text-sm mb-3 hover:text-red-400 transition-colors">
              <Phone className="w-4 h-4 shrink-0" strokeWidth={1.75} />
              +1 435-233-8048
            </a>
            <a
              href="https://maps.app.goo.gl/ckFp17UG6B5LYCD28"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-sm mb-3 hover:text-red-400 transition-colors"
            >
              <MapPin className="w-4 h-4 shrink-0" strokeWidth={1.75} />
              Utah, USA — Get Directions
            </a>
            <p className="text-sm">Mon–Fri: 8am–6pm</p>
            <p className="text-sm">Saturday: 8am–4pm</p>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-5 flex flex-col sm:flex-row
          justify-between items-center gap-2 text-xs text-gray-600">
          <span>© 2026 Escalante Auto Repair · Utah, USA · All rights reserved.</span>
          <a href="tel:+14352338048" className="text-red-700 hover:text-red-400 transition-colors font-medium">
            435-233-8048
          </a>
        </div>
      </div>
    </footer>
  );
}