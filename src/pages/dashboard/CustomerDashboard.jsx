import { useState } from 'react';
import {
  CalendarDays, CheckCircle, Clock, MapPin,
  CreditCard, Upload, Star, Wrench, Car,
  ArrowRight, AlertCircle, Phone,
} from 'lucide-react';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import StatCard from '../../components/ui/StatCard';
import InputField from '../../components/ui/InputField';
import UploadZone from '../../components/ui/UploadZone';
import { CUSTOMER_HISTORY, TRACK_STEPS, SERVICES } from '../../data/mockData';

// ─── Overview View ────────────────────────────────────────────────────────────
function OverviewView({ user }) {
  const UPCOMING = [
    { id: 'ESC-2026-047', service: 'Brake Pad Replacement', date: 'Apr 20, 2026', time: '9:00 AM', status: 'In Progress' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome banner */}
      <div className="bg-gradient-to-br from-gray-900 via-[#1a0505] to-gray-900
        border border-red-900/40 rounded-xl p-6 flex items-center justify-between gap-4">
        <div>
          <p className="text-red-400 text-xs uppercase tracking-widest font-semibold mb-1">Welcome back</p>
          <h2 className="text-white text-2xl font-extrabold">{user?.name}</h2>
          <p className="text-gray-400 text-sm mt-1">
            You have <strong className="text-white">1 active repair</strong> and your vehicle is <strong className="text-yellow-400">In Progress</strong>.
          </p>
        </div>
        <div className="text-5xl hidden sm:block select-none">🚗</div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard value="3"     label="Total Visits"    sub="All time"     />
        <StatCard value="1"     label="Active Jobs"     sub="Right now"    />
        <StatCard value="$392"  label="Total Spent"     sub="This year"    />
        <StatCard value="5★"    label="Your Rating"     sub="Thank you!"   />
      </div>

      {/* Active repair */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
        <h3 className="text-white font-bold text-sm mb-4 flex items-center gap-2">
          <Wrench className="w-4 h-4 text-red-400" /> Current Repair
        </h3>
        {UPCOMING.map(job => (
          <div key={job.id}
            className="flex items-center justify-between gap-4 bg-gray-800/50 rounded-xl p-4 border border-gray-700">
            <div>
              <p className="text-red-400 font-mono text-xs font-bold mb-0.5">{job.id}</p>
              <p className="text-white font-semibold">{job.service}</p>
              <p className="text-gray-400 text-sm">{job.date} · {job.time}</p>
            </div>
            <Badge status={job.status} />
          </div>
        ))}
      </div>

      {/* Quick actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {[
          { icon: CalendarDays, label: 'Book New Service',    desc: 'Schedule an appointment',  color: 'text-blue-400',  bg: 'bg-blue-900/20  border-blue-800/40',  view: 'book'    },
          { icon: MapPin,       label: 'Track My Repair',     desc: 'Live repair status',        color: 'text-amber-400', bg: 'bg-amber-900/20 border-amber-800/40', view: 'track'   },
          { icon: CreditCard,   label: 'View Invoices',       desc: 'Payments & receipts',       color: 'text-green-400', bg: 'bg-green-900/20 border-green-800/40', view: 'payment' },
        ].map(({ icon: Icon, label, desc, color, bg }) => (
          <div key={label}
            className={`border rounded-xl p-4 cursor-pointer hover:-translate-y-0.5 transition-all
              duration-200 hover:shadow-lg ${bg}`}>
            <Icon className={`w-6 h-6 ${color} mb-2`} strokeWidth={1.75} />
            <p className="text-white font-semibold text-sm">{label}</p>
            <p className="text-gray-500 text-xs mt-0.5">{desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Book Appointment View ────────────────────────────────────────────────────
function BookView({ showToast, addBooking }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    vehicle: '', year: '', service: '', date: '', time: '', notes: '',
  });

  function set(k, v) { setForm(f => ({ ...f, [k]: v })); }

  function handleNext() {
    if (step === 1 && (!form.vehicle || !form.year)) {
      showToast('⚠️ Please enter your vehicle details.'); return;
    }
    if (step === 2 && !form.service) {
      showToast('⚠️ Please select a service.'); return;
    }
    if (step === 3 && (!form.date || !form.time)) {
      showToast('⚠️ Please pick a date and time.'); return;
    }
    setStep(s => Math.min(s + 1, 4));
  }

  function handleConfirm() {
    const id = `ESC-2026-0${Math.floor(Math.random() * 90) + 10}`;
    addBooking({
      id,
      customer: 'John Doe',
      vehicle: `${form.year} ${form.vehicle}`,
      service: form.service,
      date: form.date,
      status: 'Scheduled',
    });
    showToast(`✅ Appointment booked! Booking ID: ${id}`);
    setStep(1);
    setForm({ vehicle: '', year: '', service: '', date: '', time: '', notes: '' });
  }

  const STEP_LABELS = ['Vehicle', 'Service', 'Schedule', 'Confirm'];

  return (
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
      {/* Stepper */}
      <div className="flex items-center">
        {STEP_LABELS.map((label, i) => {
          const n = i + 1;
          const done = step > n;
          const active = step === n;
          return (
            <div key={label} className="flex-1 flex items-center">
              <div className="flex flex-col items-center gap-1">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold
                  transition-all duration-200
                  ${done   ? 'bg-green-600 text-white' :
                    active ? 'bg-brand-700 text-white ring-4 ring-brand-700/30' :
                             'bg-gray-800 text-gray-500 border border-gray-700'}`}>
                  {done ? <CheckCircle className="w-4 h-4" /> : n}
                </div>
                <span className={`text-[10px] uppercase tracking-wide font-semibold
                  ${active ? 'text-red-400' : done ? 'text-green-400' : 'text-gray-600'}`}>
                  {label}
                </span>
              </div>
              {i < STEP_LABELS.length - 1 && (
                <div className={`flex-1 h-0.5 mx-2 mb-4 transition-colors duration-300
                  ${step > n ? 'bg-green-600' : 'bg-gray-800'}`} />
              )}
            </div>
          );
        })}
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
        {/* Step 1 – Vehicle */}
        {step === 1 && (
          <div className="space-y-4">
            <h3 className="text-white font-bold text-lg">Your Vehicle</h3>
            <div className="grid grid-cols-2 gap-4">
              <InputField label="Make & Model" id="make" placeholder="e.g. Honda Civic"
                value={form.vehicle} onChange={e => set('vehicle', e.target.value)} />
              <InputField label="Year" id="year" placeholder="e.g. 2019"
                value={form.year} onChange={e => set('year', e.target.value)} />
            </div>
          </div>
        )}

        {/* Step 2 – Service */}
        {step === 2 && (
          <div className="space-y-4">
            <h3 className="text-white font-bold text-lg">Select Service</h3>
            <div className="grid sm:grid-cols-2 gap-2 max-h-72 overflow-y-auto pr-1">
              {SERVICES.map(s => (
                <button
                  key={s.title}
                  onClick={() => set('service', s.title)}
                  className={`text-left p-3 rounded-xl border text-sm transition-all
                    ${form.service === s.title
                      ? 'border-brand-700 bg-red-900/20 text-white'
                      : 'border-gray-700 text-gray-400 hover:border-gray-600 hover:text-gray-300'}`}
                >
                  <span className="text-lg mr-2">{s.icon}</span>
                  <span className="font-semibold">{s.title}</span>
                  <span className="text-red-400 text-xs block mt-0.5">{s.price}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3 – Schedule */}
        {step === 3 && (
          <div className="space-y-4">
            <h3 className="text-white font-bold text-lg">Pick a Date & Time</h3>
            <div className="grid grid-cols-2 gap-4">
              <InputField label="Preferred Date" id="date" type="date"
                value={form.date} onChange={e => set('date', e.target.value)} />
              <InputField label="Preferred Time" id="time" as="select"
                value={form.time} onChange={e => set('time', e.target.value)}>
                <option value="">Select time…</option>
                {['8:00 AM','9:00 AM','10:00 AM','11:00 AM','1:00 PM','2:00 PM','3:00 PM','4:00 PM'].map(t =>
                  <option key={t}>{t}</option>
                )}
              </InputField>
            </div>
            <InputField label="Additional Notes (optional)" id="notes" as="textarea"
              placeholder="Describe your issue or any relevant info…"
              value={form.notes} onChange={e => set('notes', e.target.value)} />
          </div>
        )}

        {/* Step 4 – Confirm */}
        {step === 4 && (
          <div className="space-y-4">
            <h3 className="text-white font-bold text-lg">Confirm Booking</h3>
            <div className="bg-gray-800 border border-gray-700 rounded-xl divide-y divide-gray-700">
              {[
                { label: 'Vehicle',  value: `${form.year} ${form.vehicle}` },
                { label: 'Service',  value: form.service },
                { label: 'Date',     value: form.date },
                { label: 'Time',     value: form.time },
                { label: 'Notes',    value: form.notes || '—' },
              ].map(({ label, value }) => (
                <div key={label} className="flex justify-between items-center px-4 py-3">
                  <span className="text-gray-500 text-sm">{label}</span>
                  <span className="text-white text-sm font-semibold text-right max-w-[60%]">{value}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex justify-between">
        {step > 1 ? (
          <Button variant="secondary" size="md" onClick={() => setStep(s => s - 1)}>
            ← Back
          </Button>
        ) : <div />}
        {step < 4 ? (
          <Button variant="primary" size="md" onClick={handleNext}>
            Next <ArrowRight className="w-4 h-4" />
          </Button>
        ) : (
          <Button variant="primary" size="md" onClick={handleConfirm}>
            <CalendarDays className="w-4 h-4" /> Confirm Appointment
          </Button>
        )}
      </div>
    </div>
  );
}

// ─── Service History View ─────────────────────────────────────────────────────
function HistoryView() {
  return (
    <div className="space-y-5 animate-fade-in">
      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-800 bg-gray-800/40">
          <h3 className="text-white font-bold text-sm">Service History</h3>
          <p className="text-gray-500 text-xs mt-0.5">All past and current repairs for your vehicles</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-800">
                {['Date', 'Service', 'Vehicle', 'Technician', 'Cost', 'Status'].map(h => (
                  <th key={h} className="text-left text-gray-500 text-xs uppercase tracking-wide px-5 py-3 font-semibold whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {CUSTOMER_HISTORY.map((row, i) => (
                <tr key={i} className="border-b border-gray-800/50 hover:bg-gray-800/20 transition-colors">
                  <td className="px-5 py-3 text-gray-300 whitespace-nowrap text-xs">{row.date}</td>
                  <td className="px-5 py-3 text-white font-semibold">{row.service}</td>
                  <td className="px-5 py-3 text-gray-400 whitespace-nowrap">{row.vehicle}</td>
                  <td className="px-5 py-3 text-gray-400">{row.tech}</td>
                  <td className="px-5 py-3 text-green-400 font-bold">{row.cost}</td>
                  <td className="px-5 py-3"><Badge status={row.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Total spend summary */}
      <div className="grid grid-cols-3 gap-4">
        <StatCard value="5"     label="Total Services" />
        <StatCard value="$392"  label="Total Spent"    />
        <StatCard value="2"     label="Vehicles"       />
      </div>
    </div>
  );
}

// ─── Track Repair View ────────────────────────────────────────────────────────
function TrackView() {
  return (
    <div className="max-w-xl mx-auto space-y-5 animate-fade-in">
      {/* Active job card */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-red-400 font-mono text-xs font-bold">ESC-2026-047</p>
            <p className="text-white font-bold mt-0.5">2019 Honda Civic</p>
            <p className="text-gray-400 text-sm">Brake Pad Replacement + Fluid Flush</p>
          </div>
          <Badge status="In Progress" />
        </div>
        <div className="text-xs text-gray-500 flex items-center gap-2">
          <Clock className="w-3.5 h-3.5" /> Dropped off Apr 20, 2026 · 8:30 AM
        </div>
      </div>

      {/* Progress steps */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
        <h3 className="text-white font-bold text-sm mb-5">Repair Progress</h3>
        <div className="space-y-0">
          {TRACK_STEPS.map((step, i) => (
            <div key={step.label} className="flex gap-4">
              {/* Icon column */}
              <div className="flex flex-col items-center">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 border-2 transition-all
                  ${step.done
                    ? 'bg-green-600 border-green-600 text-white'
                    : step.active
                    ? 'bg-brand-700 border-brand-700 text-white ring-4 ring-brand-700/25'
                    : 'bg-gray-800 border-gray-700 text-gray-600'}`}>
                  {step.done
                    ? <CheckCircle className="w-4 h-4" />
                    : step.active
                    ? <Wrench className="w-4 h-4 animate-spin-slow" />
                    : <Clock className="w-4 h-4" />}
                </div>
                {i < TRACK_STEPS.length - 1 && (
                  <div className={`w-0.5 h-10 my-0.5 transition-colors
                    ${step.done ? 'bg-green-600' : 'bg-gray-700'}`} />
                )}
              </div>
              {/* Content */}
              <div className="pb-8">
                <p className={`font-semibold text-sm
                  ${step.done ? 'text-green-400' : step.active ? 'text-white' : 'text-gray-500'}`}>
                  {step.label}
                </p>
                <p className={`text-xs mt-0.5
                  ${step.done ? 'text-gray-400' : step.active ? 'text-gray-300' : 'text-gray-600'}`}>
                  {step.desc}
                </p>
                {step.active && (
                  <span className="mt-1.5 inline-flex items-center gap-1 text-[10px] text-yellow-400
                    bg-yellow-900/20 border border-yellow-700/30 rounded-full px-2 py-0.5 font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-400 animate-pulse" />
                    Active now
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Contact shop */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex items-center gap-4">
        <div className="w-11 h-11 rounded-xl bg-brand-700/20 border border-brand-700/30
          flex items-center justify-center shrink-0">
          <Phone className="w-5 h-5 text-red-400" strokeWidth={1.75} />
        </div>
        <div className="flex-1">
          <p className="text-white font-semibold text-sm">Questions about your repair?</p>
          <p className="text-gray-500 text-xs">Call us at 435-233-8048</p>
        </div>
        <Button as="a" href="tel:+14352338048" variant="primary" size="sm">Call</Button>
      </div>
    </div>
  );
}

// ─── Upload Images View ───────────────────────────────────────────────────────
function UploadView({ showToast }) {
  return (
    <div className="max-w-xl mx-auto space-y-5 animate-fade-in">
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
        <h3 className="text-white font-bold text-sm mb-1">Upload Vehicle Photos</h3>
        <p className="text-gray-400 text-sm mb-5">
          Share photos of the damage or issue so our technicians can prepare before your visit.
        </p>
        <UploadZone
          label="Drop images here or click to browse"
          hint="JPG, PNG, HEIC · max 10MB per file"
          onUpload={() => showToast('📤 File upload feature coming soon!')}
        />
      </div>

      <div className="bg-yellow-900/10 border border-yellow-800/30 rounded-xl p-4 flex gap-3">
        <AlertCircle className="w-5 h-5 text-yellow-400 shrink-0 mt-0.5" strokeWidth={1.75} />
        <div>
          <p className="text-yellow-300 font-semibold text-sm">Tip</p>
          <p className="text-yellow-400/70 text-sm mt-0.5">
            Clear photos of the affected area help us diagnose faster and save you time during the visit.
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Payment View ─────────────────────────────────────────────────────────────
function PaymentView({ showToast }) {
  const INVOICES = [
    { id: 'INV-2026-031', date: 'Apr 20, 2026', service: 'Brake Pad Replacement', amount: '$189.00', status: 'Pending' },
    { id: 'INV-2026-019', date: 'Mar 15, 2026', service: 'Full Synthetic Oil Change', amount: '$65.00', status: 'Completed' },
    { id: 'INV-2026-007', date: 'Feb 02, 2026', service: 'AC Recharge R134a', amount: '$89.00', status: 'Completed' },
  ];

  return (
    <div className="space-y-5 animate-fade-in">
      {/* Balance card */}
      <div className="bg-gradient-to-br from-gray-900 via-[#1a0505] to-gray-900
        border border-red-900/40 rounded-xl p-6">
        <p className="text-gray-400 text-xs uppercase tracking-widest font-semibold mb-1">Balance Due</p>
        <p className="text-white text-4xl font-black">$189.00</p>
        <p className="text-gray-500 text-sm mt-1">Invoice INV-2026-031 — Brake Pad Replacement</p>
        <div className="mt-5 flex flex-wrap gap-3">
          <Button variant="primary" size="md" onClick={() => showToast('💳 Online payment coming soon!')}>
            <CreditCard className="w-4 h-4" /> Pay Now
          </Button>
          <Button variant="ghost" size="md" onClick={() => showToast('📄 Invoice downloaded!')}>
            Download Invoice
          </Button>
        </div>
      </div>

      {/* Invoice list */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-800 bg-gray-800/40">
          <h3 className="text-white font-bold text-sm">Invoice History</h3>
        </div>
        <div className="divide-y divide-gray-800">
          {INVOICES.map(inv => (
            <div key={inv.id} className="flex items-center justify-between px-5 py-4 gap-4">
              <div>
                <p className="text-red-400 font-mono text-xs font-bold">{inv.id}</p>
                <p className="text-white text-sm font-semibold mt-0.5">{inv.service}</p>
                <p className="text-gray-500 text-xs">{inv.date}</p>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className={`font-bold text-sm ${inv.status === 'Pending' ? 'text-yellow-400' : 'text-green-400'}`}>
                  {inv.amount}
                </span>
                <Badge status={inv.status} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Main CustomerDashboard ───────────────────────────────────────────────────
export default function CustomerDashboard({ activeView, user, bookingsApi, showToast }) {
  const { addBooking } = bookingsApi;

  return (
    <div>
      {activeView === 'overview' && <OverviewView user={user} />}
      {activeView === 'book'     && <BookView     showToast={showToast} addBooking={addBooking} />}
      {activeView === 'history'  && <HistoryView  />}
      {activeView === 'track'    && <TrackView    />}
      {activeView === 'upload'   && <UploadView   showToast={showToast} />}
      {activeView === 'payment'  && <PaymentView  showToast={showToast} />}
    </div>
  );
}