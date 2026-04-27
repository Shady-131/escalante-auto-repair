import { useState } from 'react';
import {
  BarChart2, TrendingUp, Users, Clock, CheckCircle,
  ChevronDown, Save, StickyNote, Search, Filter,
  Camera, Upload, Trash2, Edit3, AlertCircle,
} from 'lucide-react';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import StatCard from '../../components/ui/StatCard';
import InputField from '../../components/ui/InputField';
import UploadZone from '../../components/ui/UploadZone';
import { TODAYS_SCHEDULE, STATUS_OPTIONS } from '../../data/mockData';

// ─── Analytics View ─────────────────────────────────────────────────────────
function AnalyticsView({ bookings }) {
  const total     = bookings.length;
  const completed = bookings.filter(b => b.status === 'Completed').length;
  const inProg    = bookings.filter(b => b.status === 'In Progress').length;
  const pending   = bookings.filter(b => b.status === 'Pending').length;

  const BAR_DATA = [
    { day: 'Mon', jobs: 5 },
    { day: 'Tue', jobs: 8 },
    { day: 'Wed', jobs: 6 },
    { day: 'Thu', jobs: 9 },
    { day: 'Fri', jobs: 11 },
    { day: 'Sat', jobs: 7 },
  ];
  const maxJobs = Math.max(...BAR_DATA.map(d => d.jobs));

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Stat Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard value={total}     label="Total Bookings"  sub="All time" />
        <StatCard value={inProg}    label="In Progress"     sub="Active now" />
        <StatCard value={completed} label="Completed"       sub="This week" />
        <StatCard value={pending}   label="Pending"         sub="Awaiting" />
      </div>

      {/* Weekly bar chart */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-white font-bold text-sm">Weekly Job Volume</h3>
            <p className="text-gray-500 text-xs mt-0.5">Jobs completed per day this week</p>
          </div>
          <span className="text-red-400 text-xs bg-red-900/20 border border-red-800/40 px-3 py-1 rounded-full font-semibold">
            This Week
          </span>
        </div>
        <div className="flex items-end gap-3 h-36">
          {BAR_DATA.map(({ day, jobs }) => (
            <div key={day} className="flex-1 flex flex-col items-center gap-1.5">
              <span className="text-gray-400 text-[11px] font-semibold">{jobs}</span>
              <div
                className="w-full rounded-t-md bg-gradient-to-t from-brand-700 to-red-500 transition-all duration-300
                  hover:from-brand-600 hover:to-red-400 cursor-pointer"
                style={{ height: `${(jobs / maxJobs) * 100}%` }}
              />
              <span className="text-gray-500 text-[11px]">{day}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Today's Schedule */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
        <h3 className="text-white font-bold text-sm mb-4 flex items-center gap-2">
          <Clock className="w-4 h-4 text-red-400" /> Today's Schedule
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-800">
                {['Time', 'Customer', 'Vehicle', 'Service', 'Status'].map(h => (
                  <th key={h} className="text-left text-gray-500 text-xs uppercase tracking-wide pb-3 pr-4 font-semibold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {TODAYS_SCHEDULE.map((row, i) => (
                <tr key={i} className="border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors">
                  <td className="py-3 pr-4 text-red-400 font-semibold text-xs whitespace-nowrap">{row.time}</td>
                  <td className="py-3 pr-4 text-gray-200 font-medium">{row.customer}</td>
                  <td className="py-3 pr-4 text-gray-400">{row.vehicle}</td>
                  <td className="py-3 pr-4 text-gray-300">{row.service}</td>
                  <td className="py-3"><Badge status={row.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Revenue quick-view */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "Today's Revenue",  value: '$1,240', trend: '+8%',  icon: TrendingUp },
          { label: 'Avg. Job Value',   value: '$187',   trend: '+3%',  icon: BarChart2  },
          { label: 'New Customers',    value: '3',      trend: '+1',   icon: Users      },
        ].map(({ label, value, trend, icon: Icon }) => (
          <div key={label} className="bg-gray-900 border border-gray-800 rounded-xl p-5 flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-red-900/20 border border-red-800/30 flex items-center justify-center shrink-0">
              <Icon className="w-5 h-5 text-red-400" strokeWidth={1.75} />
            </div>
            <div>
              <p className="text-gray-500 text-xs uppercase tracking-wide font-semibold">{label}</p>
              <p className="text-white text-xl font-black">{value}</p>
              <p className="text-green-400 text-xs font-semibold">{trend} today</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Bookings Management View ────────────────────────────────────────────────
function BookingsView({ bookings, updateStatus, showToast }) {
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  const filtered = bookings.filter(b => {
    const matchSearch =
      b.customer.toLowerCase().includes(search.toLowerCase()) ||
      b.vehicle.toLowerCase().includes(search.toLowerCase()) ||
      b.id.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === 'All' || b.status === filterStatus;
    return matchSearch && matchStatus;
  });

  return (
    <div className="space-y-5 animate-fade-in">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search by customer, vehicle, or ID…"
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-700 bg-gray-900
              text-gray-100 placeholder-gray-600 text-sm focus:outline-none
              focus:ring-2 focus:ring-brand-700 focus:border-transparent"
          />
        </div>
        <select
          value={filterStatus}
          onChange={e => setFilterStatus(e.target.value)}
          className="px-4 py-2.5 rounded-xl border border-gray-700 bg-gray-900 text-gray-300
            text-sm focus:outline-none focus:ring-2 focus:ring-brand-700"
        >
          <option value="All">All Statuses</option>
          {STATUS_OPTIONS.map(s => <option key={s}>{s}</option>)}
        </select>
      </div>

      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-800/60">
              <tr>
                {['Booking ID', 'Customer', 'Vehicle', 'Service', 'Date', 'Status', 'Action'].map(h => (
                  <th key={h} className="text-left text-gray-400 text-xs uppercase tracking-wide px-4 py-3 font-semibold whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7} className="text-center text-gray-500 py-10 text-sm">
                    No bookings found matching your search.
                  </td>
                </tr>
              )}
              {filtered.map(b => (
                <BookingRow key={b.id} booking={b} onUpdateStatus={updateStatus} showToast={showToast} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function BookingRow({ booking, onUpdateStatus, showToast }) {
  const [localStatus, setLocalStatus] = useState(booking.status);
  const [editing, setEditing] = useState(false);

  function handleSave() {
    onUpdateStatus(booking.id, localStatus);
    setEditing(false);
    showToast(`✅ ${booking.id} status updated to "${localStatus}"`);
  }

  return (
    <tr className="border-t border-gray-800 hover:bg-gray-800/25 transition-colors">
      <td className="px-4 py-3 text-red-400 font-mono text-xs font-bold">{booking.id}</td>
      <td className="px-4 py-3 text-gray-200 font-medium whitespace-nowrap">{booking.customer}</td>
      <td className="px-4 py-3 text-gray-400 whitespace-nowrap">{booking.vehicle}</td>
      <td className="px-4 py-3 text-gray-300 whitespace-nowrap">{booking.service}</td>
      <td className="px-4 py-3 text-gray-500 whitespace-nowrap">{booking.date}</td>
      <td className="px-4 py-3">
        {editing ? (
          <select
            value={localStatus}
            onChange={e => setLocalStatus(e.target.value)}
            className="px-2.5 py-1 rounded-lg border border-gray-600 bg-gray-800
              text-gray-200 text-xs focus:outline-none focus:ring-2 focus:ring-brand-700"
          >
            {STATUS_OPTIONS.map(s => <option key={s}>{s}</option>)}
          </select>
        ) : (
          <Badge status={localStatus} />
        )}
      </td>
      <td className="px-4 py-3">
        {editing ? (
          <div className="flex gap-1.5">
            <button
              onClick={handleSave}
              className="px-3 py-1.5 rounded-lg bg-brand-700 hover:bg-brand-800 text-white text-xs font-semibold transition-colors"
            >
              Save
            </button>
            <button
              onClick={() => { setEditing(false); setLocalStatus(booking.status); }}
              className="px-3 py-1.5 rounded-lg bg-gray-700 hover:bg-gray-600 text-gray-300 text-xs font-semibold transition-colors"
            >
              Cancel
            </button>
          </div>
        ) : (
          <button
            onClick={() => setEditing(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-700
              text-gray-400 hover:border-brand-700 hover:text-red-400 text-xs font-semibold transition-all"
          >
            <Edit3 className="w-3 h-3" /> Edit
          </button>
        )}
      </td>
    </tr>
  );
}

// ─── Status Update View ──────────────────────────────────────────────────────
function StatusUpdateView({ bookings, updateStatus, showToast }) {
  const active = bookings.filter(b => !['Completed', 'Cancelled'].includes(b.status));

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
        <p className="text-gray-400 text-sm flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
          Showing <strong className="text-white">{active.length}</strong> active / in-progress bookings. Completed and cancelled jobs are hidden.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {active.map(b => (
          <StatusCard key={b.id} booking={b} onUpdate={updateStatus} showToast={showToast} />
        ))}
        {active.length === 0 && (
          <div className="col-span-3 text-center py-16 text-gray-600">
            <CheckCircle className="w-10 h-10 mx-auto mb-3 text-green-500" />
            <p className="font-semibold text-gray-400">All jobs completed!</p>
          </div>
        )}
      </div>
    </div>
  );
}

function StatusCard({ booking, onUpdate, showToast }) {
  const [status, setStatus] = useState(booking.status);

  function handleUpdate(newStatus) {
    setStatus(newStatus);
    onUpdate(booking.id, newStatus);
    showToast(`🔄 ${booking.customer}'s job → ${newStatus}`);
  }

  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 flex flex-col gap-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="text-red-400 font-mono text-xs font-bold mb-1">{booking.id}</p>
          <p className="text-white font-bold">{booking.customer}</p>
          <p className="text-gray-400 text-sm">{booking.vehicle}</p>
        </div>
        <Badge status={status} />
      </div>
      <div>
        <p className="text-gray-500 text-xs uppercase tracking-wide mb-2 font-semibold">Update Status</p>
        <div className="grid grid-cols-2 gap-1.5">
          {STATUS_OPTIONS.map(s => (
            <button
              key={s}
              onClick={() => handleUpdate(s)}
              className={`text-xs py-1.5 px-2 rounded-lg border font-medium transition-all
                ${status === s
                  ? 'border-brand-700 bg-red-900/20 text-red-300'
                  : 'border-gray-700 text-gray-500 hover:border-gray-600 hover:text-gray-300'}`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Photos View ─────────────────────────────────────────────────────────────
function PhotosView({ showToast }) {
  const MOCK_PHOTOS = [
    { id: 1, type: 'Before', label: 'Honda Civic – Brake Pads', date: 'Apr 20, 2026', emoji: '🚗' },
    { id: 2, type: 'After',  label: 'Honda Civic – Brake Pads', date: 'Apr 20, 2026', emoji: '✅' },
    { id: 3, type: 'Before', label: 'Chevy Malibu – Rotor',    date: 'Apr 20, 2026', emoji: '🔧' },
    { id: 4, type: 'After',  label: 'Chevy Malibu – Rotor',    date: 'Apr 20, 2026', emoji: '✅' },
    { id: 5, type: 'Before', label: 'Toyota Camry – AC',        date: 'Apr 19, 2026', emoji: '❄️' },
    { id: 6, type: 'After',  label: 'Toyota Camry – AC',        date: 'Apr 19, 2026', emoji: '✅' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <UploadZone
        label="Upload Before / After Photos"
        hint="JPG, PNG, HEIC — max 10MB per image"
        onUpload={() => showToast('📷 Photo upload feature coming soon!')}
      />
      <div>
        <h3 className="text-white font-bold text-sm mb-4">Uploaded Photos</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {MOCK_PHOTOS.map(p => (
            <div key={p.id} className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden group">
              <div className="h-36 bg-gradient-to-br from-gray-800 to-gray-900 flex flex-col
                items-center justify-center gap-2 text-4xl relative">
                {p.emoji}
                <span className={`absolute top-2 left-2 text-[10px] font-bold uppercase tracking-widest
                  px-2 py-0.5 rounded-full
                  ${p.type === 'Before'
                    ? 'bg-amber-900/50 text-amber-300 border border-amber-700/50'
                    : 'bg-green-900/50 text-green-300 border border-green-700/50'}`}>
                  {p.type}
                </span>
                <button
                  onClick={() => showToast('🗑️ Photo deleted')}
                  className="absolute top-2 right-2 w-7 h-7 rounded-lg bg-red-900/80 text-red-400
                    items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity
                    hidden group-hover:flex"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="p-3">
                <p className="text-gray-300 text-xs font-semibold truncate">{p.label}</p>
                <p className="text-gray-600 text-xs mt-0.5">{p.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Technician Notes View ────────────────────────────────────────────────────
function NotesView({ bookings, showToast }) {
  const [selectedId, setSelectedId] = useState(bookings[0]?.id ?? '');
  const [notes, setNotes] = useState({});

  const selected = bookings.find(b => b.id === selectedId);

  function handleSave() {
    showToast(`📝 Notes saved for ${selectedId}`);
  }

  return (
    <div className="grid md:grid-cols-5 gap-5 animate-fade-in">
      {/* Booking selector */}
      <div className="md:col-span-2 bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-800 bg-gray-800/40">
          <p className="text-gray-400 text-xs uppercase tracking-wide font-semibold">Select Booking</p>
        </div>
        <div className="divide-y divide-gray-800 max-h-[420px] overflow-y-auto">
          {bookings.map(b => (
            <button
              key={b.id}
              onClick={() => setSelectedId(b.id)}
              className={`w-full text-left px-4 py-3 transition-colors
                ${selectedId === b.id ? 'bg-red-900/20 border-l-2 border-brand-700' : 'hover:bg-gray-800/40 border-l-2 border-transparent'}`}
            >
              <p className="text-xs text-red-400 font-mono font-bold">{b.id}</p>
              <p className="text-gray-200 text-sm font-semibold mt-0.5">{b.customer}</p>
              <p className="text-gray-500 text-xs">{b.service}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Notes editor */}
      <div className="md:col-span-3 bg-gray-900 border border-gray-800 rounded-xl p-5 flex flex-col gap-4">
        {selected ? (
          <>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white font-bold">{selected.customer}</p>
                <p className="text-gray-500 text-xs">{selected.vehicle} · {selected.service}</p>
              </div>
              <Badge status={selected.status} />
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-400 mb-1.5 uppercase tracking-wide">
                Technician Notes
              </label>
              <textarea
                value={notes[selectedId] ?? ''}
                onChange={e => setNotes(prev => ({ ...prev, [selectedId]: e.target.value }))}
                placeholder={`Add notes for ${selected.customer}'s repair…\n\nE.g.: Replaced front brake pads (OEM), fluid flushed. Rear rotors at 3mm — advised customer to monitor. Test drove 0.5 miles, no noise.`}
                className="w-full min-h-[220px] px-4 py-3 rounded-xl border border-gray-700 bg-gray-800
                  text-gray-200 placeholder-gray-600 text-sm resize-y
                  focus:outline-none focus:ring-2 focus:ring-brand-700"
              />
            </div>

            <div className="flex items-center gap-3">
              <Button variant="primary" size="md" onClick={handleSave}>
                <Save className="w-4 h-4" /> Save Notes
              </Button>
              <Button variant="secondary" size="md" onClick={() => setNotes(prev => ({ ...prev, [selectedId]: '' }))}>
                Clear
              </Button>
            </div>

            {notes[selectedId] && (
              <div className="bg-gray-800 border border-gray-700 rounded-xl p-4 text-sm text-gray-300 leading-relaxed">
                <p className="text-xs text-gray-500 uppercase tracking-wide font-semibold mb-2">Preview</p>
                {notes[selectedId]}
              </div>
            )}
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-gray-600">
            <div className="text-center">
              <StickyNote className="w-10 h-10 mx-auto mb-3" />
              <p>Select a booking to add notes</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Main AdminDashboard ─────────────────────────────────────────────────────
export default function AdminDashboard({ activeView, bookingsApi, showToast }) {
  const { bookings, updateStatus, addBooking } = bookingsApi;

  return (
    <div>
      {activeView === 'overview'  && <AnalyticsView    bookings={bookings} />}
      {activeView === 'bookings'  && <BookingsView     bookings={bookings} updateStatus={updateStatus} showToast={showToast} />}
      {activeView === 'status'    && <StatusUpdateView bookings={bookings} updateStatus={updateStatus} showToast={showToast} />}
      {activeView === 'photos'    && <PhotosView       showToast={showToast} />}
      {activeView === 'notes'     && <NotesView        bookings={bookings} showToast={showToast} />}
    </div>
  );
}