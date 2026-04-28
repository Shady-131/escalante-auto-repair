import { Phone, MessageCircle } from 'lucide-react';

export default function FloatingButtons() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      {/* WhatsApp */}
      <a
        href="https://wa.me/14352338048"
        target="_blank"
        rel="noreferrer"
        aria-label="WhatsApp"
        className="w-12 h-12 rounded-full bg-green-600 hover:bg-green-700 text-white
          flex items-center justify-center shadow-lg transition-all duration-200
          hover:scale-110 hover:shadow-green-500/25"
      >
        <MessageCircle className="w-5 h-5" />
      </a>
      {/* Phone */}
      <a
        href="tel:+14352338048"
        aria-label="Call us"
        className="w-12 h-12 rounded-full bg-brand-700 hover:bg-brand-800 text-white
          flex items-center justify-center shadow-lg transition-all duration-200
          hover:scale-110 hover:shadow-red-900/40"
      >
        <Phone className="w-5 h-5" />
      </a>
    </div>
  );
}