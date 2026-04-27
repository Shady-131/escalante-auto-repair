import Button from '../components/ui/Button';
import SectionHeader from '../components/ui/SectionHeader';
import { SERVICES } from '../data/mockData';
import { CalendarDays } from 'lucide-react';

export default function Services({ onNavigate }) {
  return (
    <main className="py-16 px-6 min-h-screen bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto">
        <SectionHeader
          badge="Full Service Menu"
          title="All Services"
          subtitle="Transparent pricing, expert technicians, and a guarantee on every job we do."
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map(s => (
            <div
              key={s.title}
              className="group bg-white dark:bg-gray-800 rounded-xl p-6
                border border-gray-200 dark:border-gray-700
                hover:-translate-y-1.5 hover:shadow-xl hover:border-red-300 dark:hover:border-brand-700
                transition-all duration-200 relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-brand-700
                scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              <div className="text-3xl mb-3">{s.icon}</div>
              <h3 className="font-bold mb-2 text-gray-900 dark:text-white">{s.title}</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{s.desc}</p>
              <p className="mt-4 text-brand-700 dark:text-red-400 font-bold text-sm">{s.price}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <p className="text-gray-500 dark:text-gray-400 mb-4">
            Ready to get started? Book your appointment today.
          </p>
          <Button variant="primary" size="lg" onClick={() => onNavigate('portal')}>
            <CalendarDays className="w-5 h-5" />
            Schedule Service
          </Button>
        </div>
      </div>
    </main>
  );
}