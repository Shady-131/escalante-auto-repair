import { Phone, CalendarDays, Star, MapPin, ArrowDown, Car } from 'lucide-react';
import Button from '../components/ui/Button';
import SectionHeader from '../components/ui/SectionHeader';
import { SERVICES, REVIEWS } from '../data/mockData';

const STATS = [
  { num: '10+',  label: 'Years Exp.'    },
  { num: '500+', label: 'Happy Clients' },
  { num: '98%',  label: 'Satisfaction'  },
  { num: '5★',   label: 'Rating'        },
];

export default function Home({ onNavigate }) {
  return (
    <main>
      {/* HERO */}
      <section className="relative bg-gradient-to-br from-gray-950 via-[#1a0505] to-gray-950
        min-h-[92vh] flex items-center overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: 'radial-gradient(circle, #8B1A1A 1px, transparent 1px)',
            backgroundSize:  '32px 32px',
          }}
        />

        <div className="relative max-w-7xl mx-auto px-6 py-20
          grid md:grid-cols-2 gap-12 items-center w-full">
          <div>
            <span className="inline-flex items-center gap-2 bg-red-900/30 border border-red-800/50
              text-red-300 text-xs px-3 py-1.5 rounded-full uppercase tracking-widest mb-6 font-semibold">
              <Star className="w-3 h-3 fill-red-400 text-red-400" />
              Trusted Auto Repair in Utah
            </span>

            <h1 className="text-5xl md:text-6xl font-black text-white leading-[1.08] mb-5">
              Your Car Deserves<br />
              <span className="text-red-500">Expert Care</span>
            </h1>

            <p className="text-gray-400 text-lg leading-relaxed mb-8 max-w-md">
              Professional diagnostics, honest service, quality repairs.
              We treat every vehicle like our own — because your safety is our priority.
            </p>

            <div className="flex flex-wrap gap-4 mb-10">
              <Button variant="primary" size="lg" onClick={() => onNavigate('portal')}>
                <CalendarDays className="w-5 h-5" />
                Book Appointment
              </Button>
              <Button as="a" href="tel:+14352338048" variant="call" size="lg">
                <Phone className="w-5 h-5" />
                Call Now
              </Button>
            </div>

            <div className="flex flex-wrap gap-8">
              {STATS.map(s => (
                <div key={s.label} className="text-center">
                  <div className="text-2xl font-black text-red-400">{s.num}</div>
                  <div className="text-[11px] text-gray-500 uppercase tracking-widest mt-0.5">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ✅ FIX: replaced emoji 🚗 with Lucide Car icon */}
          <div className="hidden md:flex flex-col items-center justify-center gap-4">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-red-800/20 blur-3xl scale-150 pointer-events-none" />
              <Car className="relative w-48 h-48 text-red-500/80" strokeWidth={0.75} />
            </div>
            <div className="text-center">
              <div className="text-gray-600 text-xs uppercase tracking-widest">Utah's Finest</div>
              <div className="text-red-400 font-bold text-lg">Auto Specialists</div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-gray-600
          flex flex-col items-center gap-1 animate-bounce-slow select-none">
          <ArrowDown className="w-4 h-4" />
          <span className="text-[10px] uppercase tracking-widest">Scroll</span>
        </div>
      </section>

      {/* SERVICES OVERVIEW */}
      <section className="bg-gray-50 dark:bg-gray-900 py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <SectionHeader
            badge="Our Services"
            title="What We Fix & Service"
            subtitle="Full-range auto repair from routine maintenance to complex engine work. No job too big or too small."
          />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.slice(0, 6).map(({ title, Icon, desc, price }) => (
              <div key={title}
                className="group bg-white dark:bg-gray-800 rounded-xl p-6
                  border border-gray-200 dark:border-gray-700
                  hover:-translate-y-1.5 hover:shadow-xl hover:border-red-300 dark:hover:border-brand-700
                  transition-all duration-200 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-brand-700
                  scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                {/* ✅ FIX: Lucide icon instead of emoji */}
                <Icon className="w-8 h-8 text-brand-700 dark:text-red-400 mb-3" strokeWidth={1.75} />
                <h3 className="font-bold mb-2 text-gray-900 dark:text-white">{title}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">{desc}</p>
                <p className="mt-3 text-brand-700 dark:text-red-400 font-bold text-sm">{price}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex justify-center">
            <Button variant="outline" size="lg" onClick={() => onNavigate('services')}>
              View All Services
            </Button>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="py-20 px-6 bg-white dark:bg-gray-950">
        <div className="max-w-7xl mx-auto">
          <SectionHeader badge="Customer Reviews" title="What Our Customers Say" />
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {REVIEWS.map(r => (
              <div key={r.name}
                className="bg-white dark:bg-gray-800 rounded-xl p-6
                  border border-gray-200 dark:border-gray-700
                  hover:-translate-y-1 hover:shadow-lg transition-all duration-200">
                <div className="flex gap-0.5 mb-4">
                  {[...Array(r.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-5">
                  "{r.text}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-brand-700 text-white
                    flex items-center justify-center font-bold text-sm shrink-0">
                    {r.initials}
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-gray-900 dark:text-white">{r.name}</p>
                    <p className="text-gray-400 text-xs">Google Review · {r.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MAP CTA */}
      <section className="bg-gray-50 dark:bg-gray-900 py-16 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-10 items-center">
          <div>
            <span className="inline-flex items-center gap-1.5
              bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400
              border border-red-200 dark:border-red-800/40
              text-xs px-3 py-1.5 rounded-full uppercase tracking-widest mb-4 font-semibold">
              <MapPin className="w-3 h-3" /> Find Us
            </span>
            <h2 className="text-3xl font-extrabold mb-3 text-gray-900 dark:text-white">Visit Our Shop</h2>
            <p className="text-gray-500 dark:text-gray-400 leading-relaxed mb-6">
              Conveniently located in Utah. Walk-ins welcome, appointments preferred.
              Open Monday–Saturday, 8am–6pm.
            </p>
            <div className="flex flex-wrap gap-3">
              <Button as="a" href="tel:+14352338048" variant="primary" size="lg">
                <Phone className="w-5 h-5" /> 435-233-8048
              </Button>
              <Button as="a" href="https://maps.app.goo.gl/ckFp17UG6B5LYCD28"
                target="_blank" rel="noreferrer" variant="ghost" size="lg">
                <MapPin className="w-5 h-5" /> Get Directions
              </Button>
            </div>
          </div>
          <div className="rounded-xl bg-gray-800 border border-gray-700 h-64
            flex flex-col items-center justify-center gap-4">
            <MapPin className="w-12 h-12 text-red-500" strokeWidth={1.5} />
            <p className="text-gray-400 text-sm">Utah, USA</p>
            <Button as="a" href="https://maps.app.goo.gl/ckFp17UG6B5LYCD28"
              target="_blank" rel="noreferrer" variant="primary" size="sm">
              Open in Google Maps
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}