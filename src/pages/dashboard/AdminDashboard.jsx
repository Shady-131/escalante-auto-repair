import { useState } from 'react';
import {
  BarChart2, TrendingUp, Users, Clock, CheckCircle,
  Save, StickyNote, Search, Upload, Trash2, Edit3,
  AlertCircle, Package, Plus, Minus, AlertTriangle, Filter
} from 'lucide-react';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import StatCard from '../../components/ui/StatCard';
import InputField from '../../components/ui/InputField';
import UploadZone from '../../components/ui/UploadZone';
import { STATUS_OPTIONS, INITIAL_PARTS } from '../../data/mockData';

const STATUS_STYLES = {
  'Pending':     'text-yellow-400 bg-yellow-400/10 border-yellow-400/20',
  'Scheduled':   'text-purple-400 bg-purple-400/10 border-purple-400/20',
  'In Progress': 'text-blue-400 bg-blue-400/10 border-blue-400/20',
  'Completed':   'text-green-400 bg-green-400/10 border-green-400/20',
  'Cancelled':   'text-red-400 bg-red-400/10 border-red-400/20',
};

/* ─── 1. Overview View ────────────────────────────────────────────────────── */
function OverviewView({ bookings, updateStatus, showToast }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const total     = bookings.length;
  const completed = bookings.filter(b => b.status === 'Completed').length;
  const inProg    = bookings.filter(b => b.status === 'In Progress').length;
  const pending   = bookings.filter(b => b.status === 'Pending').length;

  const BAR_DATA = [
    { day: 'Mon', jobs: 5 }, { day: 'Tue', jobs: 8 },
    { day: 'Wed', jobs: 6 }, { day: 'Thu', jobs: 9 },
    { day: 'Fri', jobs: 11 },{ day: 'Sat', jobs: 7 },
  ];
  const maxJobs = Math.max(...BAR_DATA.map(d => d.jobs));

  const filteredBookings = bookings.filter(b => {
    const q = searchQuery.toLowerCase();
    const matchSearch = b.customer.toLowerCase().includes(q) || 
                        b.vehicle.toLowerCase().includes(q) ||
                        b.id.toLowerCase().includes(q);
    const matchStatus = statusFilter === 'All' || b.status === statusFilter;
    return matchSearch && matchStatus;
  });

  const handleStatusChange = (id, newStatus) => {
    updateStatus(id, newStatus);
    showToast(`✅ Job ${id} updated to ${newStatus}`);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard value={total}     label="Total Bookings" sub="All time"   />
        <StatCard value={inProg}    label="In Progress"    sub="Active now" />
        <StatCard value={completed} label="Completed"      sub="This week"  />
        <StatCard value={pending}   label="Pending"        sub="Awaiting"   />
      </div>

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
              <div className="w-full rounded-t-md bg-gradient-to-t from-brand-700 to-red-500 transition-all duration-300 hover:from-brand-600 hover:to-red-400 cursor-pointer" style={{ height: `${(jobs / maxJobs) * 100}%` }} />
              <span className="text-gray-500 text-[11px]">{day}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {[
          { label: "Today's Revenue", value: '$1,240', trend: '+8%',  Icon: TrendingUp },
          { label: 'Avg. Job Value',  value: '$187',   trend: '+3%',  Icon: BarChart2  },
          { label: 'New Customers',   value: '3',      trend: '+1',   Icon: Users      },
        ].map(({ label, value, trend, Icon }) => (
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

      <div className="mt-8">
        <h3 className="text-white font-bold text-lg mb-4">Manage Bookings</h3>
        <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden flex flex-col">
          <div className="p-4 border-b border-gray-800 bg-gray-800/20 flex flex-col sm:flex-row gap-4 justify-between items-center">
            <div className="relative w-full sm:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input type="text" placeholder="Search by customer, vehicle, or ID..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="w-full bg-gray-950 border border-gray-700 text-white text-sm rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-brand-700 transition-colors" />
            </div>
            <div className="relative w-full sm:w-auto flex items-center gap-2">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 z-10 pointer-events-none" />
              <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="w-full sm:w-48 bg-gray-950 border border-gray-700 text-gray-300 text-sm rounded-lg pl-10 pr-8 py-2.5 appearance-none focus:outline-none focus:ring-2 focus:ring-brand-700 transition-colors cursor-pointer">
                <option value="All">All Statuses</option>
                {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="bg-gray-800/60 text-xs text-gray-400 uppercase tracking-wide">
                <tr>
                  <th className="px-6 py-4 font-semibold">Booking ID</th>
                  <th className="px-6 py-4 font-semibold">Customer</th>
                  <th className="px-6 py-4 font-semibold">Vehicle & Service</th>
                  <th className="px-6 py-4 font-semibold">Date</th>
                  <th className="px-6 py-4 font-semibold text-right">Update Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/50">
                {filteredBookings.length > 0 ? filteredBookings.map((job) => (
                  <tr key={job.id} className="hover:bg-gray-800/20 transition-colors">
                    <td className="px-6 py-4"><span className="font-mono text-xs text-red-400 font-bold">{job.id}</span></td>
                    <td className="px-6 py-4 text-white font-medium">{job.customer}</td>
                    <td className="px-6 py-4"><p className="text-gray-300 font-medium">{job.vehicle}</p><p className="text-gray-500 text-xs mt-0.5">{job.service}</p></td>
                    <td className="px-6 py-4 text-gray-400 whitespace-nowrap">{job.date}</td>
                    <td className="px-6 py-4 text-right">
                      <select value={job.status} onChange={(e) => handleStatusChange(job.id, e.target.value)} className={`text-xs font-bold px-3 py-1.5 rounded-lg border appearance-none cursor-pointer text-center outline-none transition-all ${STATUS_STYLES[job.status] || 'text-gray-300'} hover:brightness-110`}>
                        {STATUS_OPTIONS.map(s => <option key={s} value={s} className="bg-gray-900 text-white">{s}</option>)}
                      </select>
                    </td>
                  </tr>
                )) : (
                  <tr><td colSpan="5" className="px-6 py-8 text-center text-gray-500">No bookings found matching your criteria.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── 2. Inventory View ───────────────────────────────────────────────────── */
function InventoryView({ showToast }) {
  const [parts, setParts]           = useState(INITIAL_PARTS);
  const [search, setSearch]         = useState('');
  const [catFilter, setCatFilter]   = useState('All');
  const [showAdd, setShowAdd]       = useState(false);
  const [newPart, setNewPart]       = useState({ name: '', category: 'Engine', stock: '', reorderAt: '', unit: 'pcs', price: '' });

  const categories = ['All', ...new Set(parts.map(p => p.category))];
  const lowStock   = parts.filter(p => p.stock <= p.reorderAt);

  const filtered = parts.filter(p => {
    const q = search.toLowerCase();
    const matchQ   = p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
    const matchCat = catFilter === 'All' || p.category === catFilter;
    return matchQ && matchCat;
  });

  function adjustStock(id, delta) {
    setParts(prev => prev.map(p => p.id === id ? { ...p, stock: Math.max(0, p.stock + delta) } : p));
  }

  function addPart() {
    if (!newPart.name.trim()) { showToast('⚠️ Part name is required.'); return; }
    if (!newPart.stock)       { showToast('⚠️ Stock quantity is required.'); return; }
    const id = `P${String(parts.length + 1).padStart(3, '0')}`;
    setParts(prev => [...prev, { ...newPart, id, stock: Number(newPart.stock), reorderAt: Number(newPart.reorderAt) || 0, price: Number(newPart.price) || 0 }]);
    setNewPart({ name: '', category: 'Engine', stock: '', reorderAt: '', unit: 'pcs', price: '' });
    setShowAdd(false);
    showToast('✅ Part added to inventory');
  }

  function set(k, v) { setNewPart(f => ({ ...f, [k]: v })); }
  const PART_CATEGORIES = ['Engine','Brakes','Fluids','Electrical','Exterior','Suspension','Other'];

  return (
    <div className="space-y-5 animate-fade-in">
      {lowStock.length > 0 && (
        <div className="bg-orange-900/20 border border-orange-700/40 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-4 h-4 text-orange-400 shrink-0" />
            <p className="text-orange-300 font-semibold text-sm">{lowStock.length} part{lowStock.length > 1 ? 's' : ''} at or below reorder level</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {lowStock.map(p => <span key={p.id} className="text-xs bg-orange-900/40 text-orange-300 border border-orange-700/40 px-2.5 py-1 rounded-full font-medium">{p.name} — {p.stock} {p.unit} left</span>)}
          </div>
        </div>
      )}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search parts…" className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-700 bg-gray-900 text-gray-100 placeholder-gray-600 text-sm focus:outline-none focus:ring-2 focus:ring-brand-700" />
        </div>
        <select value={catFilter} onChange={e => setCatFilter(e.target.value)} className="px-4 py-2.5 rounded-xl border border-gray-700 bg-gray-900 text-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-700">
          {categories.map(c => <option key={c}>{c}</option>)}
        </select>
        <Button variant="primary" size="md" onClick={() => setShowAdd(s => !s)}><Plus className="w-4 h-4" /> Add Part</Button>
      </div>

      {showAdd && (
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 space-y-4">
          <h3 className="text-white font-bold text-sm">Add New Spare Part</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <InputField label="Part Name" id="p-name" placeholder="e.g. Brake Pads" value={newPart.name} onChange={e => set('name', e.target.value)} />
            <InputField label="Category" id="p-cat" as="select" value={newPart.category} onChange={e => set('category', e.target.value)}>{PART_CATEGORIES.map(c => <option key={c}>{c}</option>)}</InputField>
            <InputField label="Unit" id="p-unit" placeholder="pcs / set / pair" value={newPart.unit} onChange={e => set('unit', e.target.value)} />
            <InputField label="Stock Qty" id="p-stock" type="number" placeholder="0" value={newPart.stock} onChange={e => set('stock', e.target.value)} />
            <InputField label="Reorder At" id="p-reord" type="number" placeholder="5" value={newPart.reorderAt} onChange={e => set('reorderAt', e.target.value)} />
            <InputField label="Unit Price ($)" id="p-price" type="number" placeholder="0" value={newPart.price} onChange={e => set('price', e.target.value)} />
          </div>
          <div className="flex gap-3">
            <Button variant="primary" size="md" onClick={addPart}>Save Part</Button>
            <Button variant="secondary" size="md" onClick={() => setShowAdd(false)}>Cancel</Button>
          </div>
        </div>
      )}

      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-800/60">
              <tr>{['ID','Part Name','Category','Stock','Reorder At','Unit Price','Status','Adjust'].map(h => <th key={h} className="text-left text-gray-400 text-xs uppercase tracking-wide px-4 py-3 font-semibold whitespace-nowrap">{h}</th>)}</tr>
            </thead>
            <tbody>
              {filtered.map(p => {
                const isLow = p.stock <= p.reorderAt;
                return (
                  <tr key={p.id} className={`border-t border-gray-800 hover:bg-gray-800/25 transition-colors ${isLow ? 'bg-orange-900/5' : ''}`}>
                    <td className="px-4 py-3 text-gray-500 font-mono text-xs">{p.id}</td>
                    <td className="px-4 py-3 text-gray-200 font-medium whitespace-nowrap">{p.name}</td>
                    <td className="px-4 py-3 text-gray-400 whitespace-nowrap">{p.category}</td>
                    <td className="px-4 py-3"><span className={`font-bold text-sm ${isLow ? 'text-orange-400' : 'text-white'}`}>{p.stock}</span></td>
                    <td className="px-4 py-3 text-gray-500 text-sm">{p.reorderAt}</td>
                    <td className="px-4 py-3 text-green-400 font-semibold">${p.price}</td>
                    <td className="px-4 py-3"><Badge status={isLow ? 'Low Stock' : 'In Stock'} /></td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        <button onClick={() => adjustStock(p.id, -1)} className="w-7 h-7 rounded-lg border border-gray-700 flex items-center justify-center text-gray-400 hover:text-red-400 hover:border-brand-700 transition-all"><Minus className="w-3 h-3" /></button>
                        <button onClick={() => adjustStock(p.id, 1)} className="w-7 h-7 rounded-lg border border-gray-700 flex items-center justify-center text-gray-400 hover:text-green-400 hover:border-green-600 transition-all"><Plus className="w-3 h-3" /></button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ─── 3. Photos View ──────────────────────────────────────────────────────── */
function PhotosView({ showToast }) {
  const MOCK_PHOTOS = [
    { id: 1, type: 'Before', label: 'Honda Civic – Brake Pads', date: 'Apr 20, 2026',  bg: 'from-gray-800 to-gray-900' },
    { id: 2, type: 'After',  label: 'Honda Civic – Brake Pads', date: 'Apr 20, 2026',  bg: 'from-green-950 to-gray-900' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <UploadZone label="Upload Before / After Photos" hint="JPG, PNG, HEIC — max 10MB per image" onUpload={() => showToast('📷 Photo upload feature coming soon!')} />
      <div>
        <h3 className="text-white font-bold text-sm mb-4">Uploaded Photos</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {MOCK_PHOTOS.map(p => (
            <div key={p.id} className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden group">
              <div className={`h-36 bg-gradient-to-br ${p.bg} flex flex-col items-center justify-center gap-2 relative`}>
                <Package className="w-10 h-10 text-gray-600" strokeWidth={1} />
                <span className={`absolute top-2 left-2 text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full ${p.type === 'Before' ? 'bg-amber-900/50 text-amber-300 border border-amber-700/50' : 'bg-green-900/50 text-green-300 border border-green-700/50'}`}>{p.type}</span>
                <button onClick={() => showToast('🗑️ Photo deleted')} className="absolute top-2 right-2 w-7 h-7 rounded-lg bg-red-900/80 text-red-400 items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hidden group-hover:flex"><Trash2 className="w-3.5 h-3.5" /></button>
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

/* ─── 4. Notes View ───────────────────────────────────────────────────────── */
function NotesView({ bookings, showToast }) {
  const [selectedId, setSelectedId] = useState(bookings[0]?.id ?? '');
  const [notes, setNotes]           = useState({});
  const selected = bookings.find(b => b.id === selectedId);

  return (
    <div className="grid md:grid-cols-5 gap-5 animate-fade-in">
      <div className="md:col-span-2 bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-800 bg-gray-800/40">
          <p className="text-gray-400 text-xs uppercase tracking-wide font-semibold">Select Booking</p>
        </div>
        <div className="divide-y divide-gray-800 max-h-[420px] overflow-y-auto">
          {bookings.map(b => (
            <button key={b.id} onClick={() => setSelectedId(b.id)} className={`w-full text-left px-4 py-3 transition-colors ${selectedId === b.id ? 'bg-red-900/20 border-l-2 border-brand-700' : 'hover:bg-gray-800/40 border-l-2 border-transparent'}`}>
              <p className="text-xs text-red-400 font-mono font-bold">{b.id}</p>
              <p className="text-gray-200 text-sm font-semibold mt-0.5">{b.customer}</p>
              <p className="text-gray-500 text-xs">{b.service}</p>
            </button>
          ))}
        </div>
      </div>
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
              <label className="block text-xs font-semibold text-gray-400 mb-1.5 uppercase tracking-wide">Technician Notes</label>
              <textarea value={notes[selectedId] ?? ''} onChange={e => setNotes(prev => ({ ...prev, [selectedId]: e.target.value }))} placeholder={`Add repair notes for ${selected.customer}…`} className="w-full min-h-[220px] px-4 py-3 rounded-xl border border-gray-700 bg-gray-800 text-gray-200 placeholder-gray-600 text-sm resize-y focus:outline-none focus:ring-2 focus:ring-brand-700" />
            </div>
            <div className="flex items-center gap-3">
              <Button variant="primary" size="md" onClick={() => showToast(`📝 Notes saved for ${selectedId}`)}><Save className="w-4 h-4" /> Save Notes</Button>
              <Button variant="secondary" size="md" onClick={() => setNotes(prev => ({ ...prev, [selectedId]: '' }))}>Clear</Button>
            </div>
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

/* ─── Main AdminDashboard Export (وهو ده اللي كان ناقصك وعمل الشاشة البيضا) ── */
export default function AdminDashboard({ activeView, bookingsApi, showToast }) {
  const { bookings, updateStatus } = bookingsApi;
  return (
    <div>
      {(activeView === 'overview' || activeView === 'analytics' || activeView === 'bookings' || activeView === 'manage' || activeView === 'status') && 
        <OverviewView bookings={bookings} updateStatus={updateStatus} showToast={showToast} />}
      {activeView === 'inventory' && <InventoryView showToast={showToast} />}
      {(activeView === 'photos' || activeView === 'gallery') && <PhotosView showToast={showToast} />}
      {activeView === 'notes' && <NotesView bookings={bookings} showToast={showToast} />}
    </div>
  );
}