import { Wrench, BadgeCheck, ShieldCheck, DollarSign, Clock, Camera } from 'lucide-react';
import SectionHeader from '../components/ui/SectionHeader';
import StatCard from '../components/ui/StatCard';

const TRUST = [
  { Icon: BadgeCheck,  text: 'ASE Certified Technicians'               },
  { Icon: ShieldCheck, text: 'Warranty on All Repairs'                 },
  { Icon: DollarSign,  text: 'No Surprise Fees — Free Estimates'       },
  { Icon: Clock,       text: 'Fast Turnaround — Same Day Service Available' },
  { Icon: Camera,      text: 'Before & After Photos Provided'          },
];

const ABOUT_STATS = [
  { value: '500+', label: 'Vehicles Serviced' },
  { value: '5★',   label: 'Average Rating'    },
  { value: '98%',  label: 'Satisfaction Rate' },
  { value: '24h',  label: 'Avg. Turnaround'   },
];

export default function About() {
  return (
    <main className="py-16 px-6 min-h-screen bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-start">
          <div>
            <SectionHeader
              badge="Our Story"
              title="Built on Trust & Experience"
              subtitle="Escalante Auto Repair was founded with one simple mission: provide honest, affordable, and high-quality auto repair to the people of Utah."
            />
            <p className="text-gray-500 dark:text-gray-400 leading-relaxed mb-6">
              With over a decade of hands-on experience, we've earned the trust of hundreds of families
              and businesses across the region. We invest in the latest diagnostic tools and ongoing
              training so our team stays ahead of the curve — whether it's a classic car or the newest
              hybrid system, we've got you covered.
            </p>
            <div className="flex flex-col gap-3">
              {TRUST.map(({ Icon, text }) => (
                <div key={text}
                  className="flex items-center gap-3 bg-gray-50 dark:bg-gray-800
                    border-l-4 border-brand-700 rounded-r-xl px-4 py-3">
                  <Icon className="w-5 h-5 text-brand-700 dark:text-red-400 shrink-0" strokeWidth={1.75} />
                  <span className="font-semibold text-sm text-gray-800 dark:text-gray-200">{text}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-900 via-[#1a0505] to-gray-900
            rounded-2xl p-8 border-2 border-red-900/40 text-center">
            {/* ✅ FIX: replaced 🔧 emoji with Lucide Wrench icon */}
            <div className="flex justify-center mb-4">
              <Wrench className="w-20 h-20 text-red-500/70" strokeWidth={1} />
            </div>
            <div className="text-white text-2xl font-black mb-1">10+ Years</div>
            <div className="text-gray-400 text-sm mb-8">Serving Utah's Auto Repair Needs</div>
            <div className="grid grid-cols-2 gap-3">
              {ABOUT_STATS.map(s => (
                <div key={s.label} className="bg-white/5 rounded-xl p-4 text-center">
                  <div className="text-red-400 text-xl font-black">{s.value}</div>
                  <div className="text-gray-500 text-xs mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}