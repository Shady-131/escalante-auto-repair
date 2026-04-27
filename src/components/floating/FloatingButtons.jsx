import { Phone } from 'lucide-react';

export default function FloatingButtons() {
  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">

      {/* WhatsApp */}
      <div className="group relative flex items-center justify-end">
        <span className="absolute right-16 bg-gray-900 text-white text-xs px-2.5 py-1.5
          rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100
          transition-opacity duration-200 pointer-events-none shadow-lg">
          WhatsApp Us
        </span>
        <a
          href="https://wa.me/14352338048"
          target="_blank"
          rel="noreferrer"
          aria-label="Chat on WhatsApp"
          className="w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center
            justify-center shadow-lg hover:scale-110 active:scale-95
            hover:shadow-[0_4px_20px_rgba(37,211,102,0.5)] transition-all duration-200"
        >
          <svg viewBox="0 0 24 24" className="w-7 h-7 fill-white" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.127.558 4.126 1.532 5.862L.057 23.854a.75.75 0 00.92.92l6.055-1.467A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.722 9.722 0 01-4.95-1.353l-.356-.211-3.683.892.908-3.595-.232-.368A9.719 9.719 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z" />
          </svg>
        </a>
      </div>

      {/* Call */}
      <div className="group relative flex items-center justify-end">
        <span className="absolute right-16 bg-gray-900 text-white text-xs px-2.5 py-1.5
          rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100
          transition-opacity duration-200 pointer-events-none shadow-lg">
          Call Now
        </span>
        <a
          href="tel:+14352338048"
          aria-label="Call Escalante Auto Repair"
          className="w-14 h-14 rounded-full bg-brand-700 text-white flex items-center
            justify-center shadow-lg hover:scale-110 hover:bg-brand-800 active:scale-95
            hover:shadow-[0_4px_20px_rgba(139,26,26,0.6)]
            transition-all duration-200 animate-pulse-ring"
        >
          <Phone className="w-6 h-6" strokeWidth={2} />
        </a>
      </div>

    </div>
  );
}