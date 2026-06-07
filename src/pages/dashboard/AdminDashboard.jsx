import { useState, useEffect, useRef } from 'react';
import {
  BarChart2, TrendingUp, Users, CheckCircle,
  Save, StickyNote, Search, Upload, Trash2, Edit3,
  Package, Plus, Minus, AlertTriangle, Filter, Wrench,
  X, RotateCcw,
} from 'lucide-react';
import Badge from '../../components/ui/Badge';
import Button from '../../components/ui/Button';
import InputField from '../../components/ui/InputField';
import UploadZone from '../../components/ui/UploadZone';
import { STATUS_OPTIONS, INITIAL_PARTS } from '../../data/mockData';
import { useServices } from '../../hooks/useServices';

const PARTS_KEY = 'esc_parts';

const STATUS_STYLES = {
  'Pending':     'text-yellow-400 bg-yellow-400/10 border-yellow-400/20',
  'Scheduled':   'text-purple-400 bg-purple-400/10 border-purple-400/20',
  'In Progress': 'text-blue-400 bg-blue-400/10 border-blue-400/20',
  'Completed':   'text-green-400 bg-green-400/10 border-green-400/20',
  'Cancelled':   'text-red-400 bg-red-400/10 border-red-400/20',
};

/* ─── 1. Overview ────────────────────────────────────────────────────────── */
function OverviewView({ bookings, updateStatus, showToast }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const stats = {
    total:     bookings.length,
    active:    bookings.filter(b => b.status === 'In Progress').length,
    completed: bookings.filter(b => b.status === 'Completed').length,
    pending:   bookings.filter(b => b.status === 'Pending').length,
  };

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
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Total Bookings', value: stats.total,     icon: Users,       color: 'text-gray-400' },
          { label: 'In Progress',    value: stats.active,    icon: Wrench,      color: 'text-blue-400' },
          { label: 'Completed',      value: stats.completed, icon: CheckCircle, color: 'text-green-400' },
          { label: 'Pending',        value: stats.pending,   icon: TrendingUp,  color: 'text-yellow-400' },
        ].map((item, i) => (
          <div key={i} className="bg-gray-900 border border-gray-800 rounded-xl p-5 flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-xs font-semibold uppercase tracking-wider mb-1">{item.label}</p>
              <p className={`text-2xl font-black ${item.color}`}>{item.value}</p>
            </div>
            <div className={`p-3 rounded-lg bg-gray-800/50 ${item.color}`}>
              <item.icon className="w-5 h-5" />
            </div>
          </div>
        ))}
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
        <div className="flex items-end justify-between gap-2 h-40 mt-4">
          {BAR_DATA.map(({ day, jobs }) => (
            <div key={day} className="flex-1 flex flex-col items-center justify-end h-full gap-1.5 px-1 sm:px-2 lg:px-4">
              <span className="text-gray-400 text-[11px] font-semibold">{jobs}</span>
              <div
                className="w-full rounded-t-md bg-red-600 shadow-[0_0_12px_rgba(220,38,38,0.4)] transition-all duration-300 hover:bg-red-500 hover:shadow-[0_0_18px_rgba(239,68,68,0.6)] cursor-pointer"
                style={{ height: `${Math.max((jobs / maxJobs) * 100, 5)}%` }}
              />
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
              <input
                type="text"
                placeholder="Search by customer, vehicle, or ID..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-gray-950 border border-gray-700 text-white text-sm rounded-lg pl-10 pr-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-brand-700 transition-colors"
              />
            </div>
            <div className="relative w-full sm:w-auto flex items-center gap-2">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 z-10 pointer-events-none" />
              <select
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value)}
                className="w-full sm:w-48 bg-gray-950 border border-gray-700 text-gray-300 text-sm rounded-lg pl-10 pr-8 py-2.5 appearance-none focus:outline-none focus:ring-2 focus:ring-brand-700 transition-colors cursor-pointer"
              >
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
                {filteredBookings.length > 0 ? filteredBookings.map(job => (
                  <tr key={job.id} className="hover:bg-gray-800/20 transition-colors">
                    <td className="px-6 py-4"><span className="font-mono text-xs text-red-400 font-bold">{job.id}</span></td>
                    <td className="px-6 py-4 text-white font-medium">{job.customer}</td>
                    <td className="px-6 py-4">
                      <p className="text-gray-300 font-medium">{job.vehicle}</p>
                      <p className="text-gray-500 text-xs mt-0.5">{job.service}</p>
                    </td>
                    <td className="px-6 py-4 text-gray-400 whitespace-nowrap">{job.date}</td>
                    <td className="px-6 py-4 text-right">
                      <select
                        value={job.status}
                        onChange={e => handleStatusChange(job.id, e.target.value)}
                        className={`text-xs font-bold px-3 py-1.5 rounded-lg border appearance-none cursor-pointer text-center outline-none transition-all ${STATUS_STYLES[job.status] || 'text-gray-300'} hover:brightness-110`}
                      >
                        {STATUS_OPTIONS.map(s => (
                          <option key={s} value={s} className="bg-gray-900 text-white">{s}</option>
                        ))}
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

/* ─── 2. Inventory (Spare Parts) ─────────────────────────────────────────── */
function InventoryView({ showToast }) {
  const [parts, setParts] = useState(() => {
    try {
      const saved = localStorage.getItem(PARTS_KEY);
      return saved ? JSON.parse(saved) : INITIAL_PARTS;
    } catch { return INITIAL_PARTS; }
  });
  const [search,       setSearch]       = useState('');
  const [catFilter,    setCatFilter]    = useState('All');
  const [showAdd,      setShowAdd]      = useState(false);
  const [newPart,      setNewPart]      = useState({ name: '', category: 'Engine', stock: '', reorderAt: '', unit: 'pcs', price: '' });
  const [editingPrice, setEditingPrice] = useState({ id: null, value: '' });

  // Persist parts to localStorage whenever they change
  useEffect(() => {
    try { localStorage.setItem(PARTS_KEY, JSON.stringify(parts)); } catch {}
  }, [parts]);

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

  function deletePart(id) {
    setParts(prev => prev.filter(p => p.id !== id));
    showToast('🗑️ Part removed from inventory');
  }

  function startEditPrice(p) {
    setEditingPrice({ id: p.id, value: String(p.price) });
  }

  function saveEditPrice(id) {
    const val = parseFloat(editingPrice.value);
    if (isNaN(val) || val < 0) { showToast('⚠️ Enter a valid price'); return; }
    setParts(prev => prev.map(p => p.id === id ? { ...p, price: val } : p));
    setEditingPrice({ id: null, value: '' });
    showToast('✅ Price updated');
  }

  function addPart() {
    if (!newPart.name.trim()) { showToast('⚠️ Part name is required.'); return; }
    if (!newPart.stock)       { showToast('⚠️ Stock quantity is required.'); return; }
    const id = `P${String(parts.length + 1).padStart(3, '0')}`;
    setParts(prev => [...prev, {
      ...newPart, id,
      stock:     Number(newPart.stock),
      reorderAt: Number(newPart.reorderAt) || 0,
      price:     Number(newPart.price) || 0,
    }]);
    setNewPart({ name: '', category: 'Engine', stock: '', reorderAt: '', unit: 'pcs', price: '' });
    setShowAdd(false);
    showToast('✅ Part added to inventory');
  }

  function set(k, v) { setNewPart(f => ({ ...f, [k]: v })); }
  const PART_CATEGORIES = ['Engine', 'Brakes', 'Fluids', 'Electrical', 'Exterior', 'Suspension', 'Other'];

  return (
    <div className="space-y-5 animate-fade-in">
      {lowStock.length > 0 && (
        <div className="bg-orange-900/20 border border-orange-700/40 rounded-xl p-4">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="w-4 h-4 text-orange-400 shrink-0" />
            <p className="text-orange-300 font-semibold text-sm">
              {lowStock.length} part{lowStock.length > 1 ? 's' : ''} at or below reorder level
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {lowStock.map(p => (
              <span key={p.id} className="text-xs bg-orange-900/40 text-orange-300 border border-orange-700/40 px-2.5 py-1 rounded-full font-medium">
                {p.name} — {p.stock} {p.unit} left
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search parts…"
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-700 bg-gray-900 text-gray-100 placeholder-gray-600 text-sm focus:outline-none focus:ring-2 focus:ring-brand-700" />
        </div>
        <select value={catFilter} onChange={e => setCatFilter(e.target.value)}
          className="px-4 py-2.5 rounded-xl border border-gray-700 bg-gray-900 text-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-brand-700">
          {categories.map(c => <option key={c}>{c}</option>)}
        </select>
        <Button variant="primary" size="md" onClick={() => setShowAdd(s => !s)}>
          <Plus className="w-4 h-4" /> Add Part
        </Button>
      </div>

      {/* Add new part form */}
      {showAdd && (
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 space-y-4">
          <h3 className="text-white font-bold text-sm">Add New Spare Part</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <InputField label="Part Name"     id="p-name"  placeholder="e.g. Brake Pads"   value={newPart.name}      onChange={e => set('name',      e.target.value)} />
            <InputField label="Category"      id="p-cat"   as="select"                       value={newPart.category}  onChange={e => set('category',  e.target.value)}>
              {PART_CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </InputField>
            <InputField label="Unit"          id="p-unit"  placeholder="pcs / set / pair"   value={newPart.unit}      onChange={e => set('unit',      e.target.value)} />
            <InputField label="Stock Qty"     id="p-stock" type="number" placeholder="0"    value={newPart.stock}     onChange={e => set('stock',     e.target.value)} />
            <InputField label="Reorder At"    id="p-reord" type="number" placeholder="5"    value={newPart.reorderAt} onChange={e => set('reorderAt', e.target.value)} />
            <InputField label="Unit Price ($)" id="p-price" type="number" placeholder="0"   value={newPart.price}     onChange={e => set('price',     e.target.value)} />
          </div>
          <div className="flex gap-3">
            <Button variant="primary"   size="md" onClick={addPart}>Save Part</Button>
            <Button variant="secondary" size="md" onClick={() => setShowAdd(false)}>Cancel</Button>
          </div>
        </div>
      )}

      {/* Parts table */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-800/60">
              <tr>
                {['ID', 'Part Name', 'Category', 'Stock', 'Reorder At', 'Unit Price', 'Status', 'Actions'].map(h => (
                  <th key={h} className="text-left text-gray-400 text-xs uppercase tracking-wide px-4 py-3 font-semibold whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(p => {
                const isLow = p.stock <= p.reorderAt;
                return (
                  <tr key={p.id} className={`border-t border-gray-800 hover:bg-gray-800/25 transition-colors ${isLow ? 'bg-orange-900/5' : ''}`}>
                    <td className="px-4 py-3 text-gray-500 font-mono text-xs">{p.id}</td>
                    <td className="px-4 py-3 text-gray-200 font-medium whitespace-nowrap">{p.name}</td>
                    <td className="px-4 py-3 text-gray-400 whitespace-nowrap">{p.category}</td>
                    <td className="px-4 py-3">
                      <span className={`font-bold text-sm ${isLow ? 'text-orange-400' : 'text-white'}`}>{p.stock}</span>
                    </td>
                    <td className="px-4 py-3 text-gray-500 text-sm">{p.reorderAt}</td>

                    {/* Editable price cell */}
                    <td className="px-4 py-3">
                      {editingPrice.id === p.id ? (
                        <div className="flex items-center gap-1">
                          <span className="text-gray-400 text-xs shrink-0">$</span>
                          <input
                            type="number"
                            min="0"
                            value={editingPrice.value}
                            onChange={e => setEditingPrice(prev => ({ ...prev, value: e.target.value }))}
                            onKeyDown={e => {
                              if (e.key === 'Enter')  saveEditPrice(p.id);
                              if (e.key === 'Escape') setEditingPrice({ id: null, value: '' });
                            }}
                            className="w-16 bg-gray-800 border border-red-600 text-white text-xs rounded px-1.5 py-1 focus:outline-none"
                            autoFocus
                          />
                          <button onClick={() => saveEditPrice(p.id)} className="text-green-400 hover:text-green-300 transition-colors">
                            <CheckCircle className="w-3.5 h-3.5" />
                          </button>
                          <button onClick={() => setEditingPrice({ id: null, value: '' })} className="text-gray-500 hover:text-gray-300 transition-colors">
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <button onClick={() => startEditPrice(p)}
                          className="flex items-center gap-1.5 group/price hover:opacity-80 transition-opacity">
                          <span className="text-green-400 font-semibold">${p.price}</span>
                          <Edit3 className="w-3 h-3 text-gray-600 group-hover/price:text-gray-400 transition-colors" />
                        </button>
                      )}
                    </td>

                    <td className="px-4 py-3">
                      <Badge status={isLow ? 'Low Stock' : 'In Stock'} />
                    </td>

                    {/* Actions: stock adjust + delete */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        <button onClick={() => adjustStock(p.id, -1)}
                          className="w-7 h-7 rounded-lg border border-gray-700 flex items-center justify-center text-gray-400 hover:text-red-400 hover:border-brand-700 transition-all">
                          <Minus className="w-3 h-3" />
                        </button>
                        <button onClick={() => adjustStock(p.id, 1)}
                          className="w-7 h-7 rounded-lg border border-gray-700 flex items-center justify-center text-gray-400 hover:text-green-400 hover:border-green-600 transition-all">
                          <Plus className="w-3 h-3" />
                        </button>
                        <button onClick={() => deletePart(p.id)}
                          className="w-7 h-7 rounded-lg border border-gray-700 flex items-center justify-center text-gray-400 hover:text-red-400 hover:border-red-700 transition-all ml-1">
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr><td colSpan="8" className="px-4 py-8 text-center text-gray-500 text-sm">No parts match your search.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ─── 3. Photos ──────────────────────────────────────────────────────────── */
function PhotosView({ showToast }) {
  const MOCK_PHOTOS = [
    { id: 1, type: 'Before', label: 'Honda Civic – Brake Pads', date: 'Apr 20, 2026', bg: 'from-gray-800 to-gray-900' },
    { id: 2, type: 'After',  label: 'Honda Civic – Brake Pads', date: 'Apr 20, 2026', bg: 'from-green-950 to-gray-900' },
  ];

  return (
    <div className="space-y-6 animate-fade-in">
      <UploadZone label="Upload Before / After Photos" hint="JPG, PNG, HEIC — max 10MB per image"
        onUpload={() => showToast('📷 Photo upload feature coming soon!')} />
      <div>
        <h3 className="text-white font-bold text-sm mb-4">Uploaded Photos</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {MOCK_PHOTOS.map(p => (
            <div key={p.id} className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden group">
              <div className={`h-36 bg-gradient-to-br ${p.bg} flex flex-col items-center justify-center gap-2 relative`}>
                <Package className="w-10 h-10 text-gray-600" strokeWidth={1} />
                <span className={`absolute top-2 left-2 text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full
                  ${p.type === 'Before' ? 'bg-amber-900/50 text-amber-300 border border-amber-700/50'
                                        : 'bg-green-900/50 text-green-300 border border-green-700/50'}`}>
                  {p.type}
                </span>
                <button onClick={() => showToast('🗑️ Photo deleted')}
                  className="absolute top-2 right-2 w-7 h-7 rounded-lg bg-red-900/80 text-red-400 items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hidden group-hover:flex">
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

/* ─── 4. Notes ───────────────────────────────────────────────────────────── */
function NotesView({ bookings, showToast }) {
  const [selectedId, setSelectedId] = useState(bookings[0]?.id ?? '');
  const [notes,      setNotes]      = useState({});
  const selected = bookings.find(b => b.id === selectedId);

  return (
    <div className="grid md:grid-cols-5 gap-5 animate-fade-in">
      <div className="md:col-span-2 bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-800 bg-gray-800/40">
          <p className="text-gray-400 text-xs uppercase tracking-wide font-semibold">Select Booking</p>
        </div>
        <div className="divide-y divide-gray-800 max-h-[420px] overflow-y-auto">
          {bookings.map(b => (
            <button key={b.id} onClick={() => setSelectedId(b.id)}
              className={`w-full text-left px-4 py-3 transition-colors border-l-2
                ${selectedId === b.id ? 'bg-red-900/20 border-brand-700' : 'hover:bg-gray-800/40 border-transparent'}`}>
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
              <label className="block text-xs font-semibold text-gray-400 mb-1.5 uppercase tracking-wide">
                Technician Notes
              </label>
              <textarea
                value={notes[selectedId] ?? ''}
                onChange={e => setNotes(prev => ({ ...prev, [selectedId]: e.target.value }))}
                placeholder={`Add repair notes for ${selected.customer}…`}
                className="w-full min-h-[220px] px-4 py-3 rounded-xl border border-gray-700 bg-gray-800 text-gray-200 placeholder-gray-600 text-sm resize-y focus:outline-none focus:ring-2 focus:ring-brand-700"
              />
            </div>
            <div className="flex items-center gap-3">
              <Button variant="primary" size="md" onClick={() => showToast(`📝 Notes saved for ${selectedId}`)}>
                <Save className="w-4 h-4" /> Save Notes
              </Button>
              <Button variant="secondary" size="md" onClick={() => setNotes(prev => ({ ...prev, [selectedId]: '' }))}>
                Clear
              </Button>
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

/* ─── 5. Service Prices ──────────────────────────────────────────────────── */
function ServicePricesView({ showToast }) {
  const { services, updatePrice, resetPrice, customPrices } = useServices();
  const [editing, setEditing] = useState({ title: null, value: '' });

  function startEdit(title, currentPrice) {
    setEditing({ title, value: currentPrice });
  }

  function saveEdit(title) {
    const val = editing.value.trim();
    if (!val) { showToast('⚠️ Price cannot be empty'); return; }
    updatePrice(title, val);
    setEditing({ title: null, value: '' });
    showToast('✅ Price updated');
  }

  function handleReset(title) {
    resetPrice(title);
    setEditing({ title: null, value: '' });
    showToast('↩️ Price reset to default');
  }

  return (
    <div className="max-w-2xl space-y-4 animate-fade-in">
      <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-800 bg-gray-800/40">
          <h3 className="text-white font-bold text-sm">Service Prices</h3>
          <p className="text-gray-500 text-xs mt-0.5">
            Click any price to edit it. Changes appear on the public site after navigating to that page.
          </p>
        </div>

        <div className="divide-y divide-gray-800">
          {services.map(({ title, Icon, price }) => {
            const isCustom  = customPrices[title] !== undefined;
            const isEditing = editing.title === title;

            return (
              <div key={title} className="flex items-center gap-3 px-5 py-3.5">
                {/* Icon + name */}
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-red-900/20 border border-red-800/30
                    flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4 text-red-400" strokeWidth={1.75} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-white font-semibold text-sm truncate">{title}</p>
                    {isCustom && (
                      <span className="text-[10px] text-amber-400 font-semibold uppercase tracking-wide leading-none">
                        Custom
                      </span>
                    )}
                  </div>
                </div>

                {/* Price — inline edit */}
                <div className="flex items-center gap-2 shrink-0">
                  {isEditing ? (
                    <>
                      <input
                        type="text"
                        value={editing.value}
                        onChange={e => setEditing(prev => ({ ...prev, value: e.target.value }))}
                        onKeyDown={e => {
                          if (e.key === 'Enter')  saveEdit(title);
                          if (e.key === 'Escape') setEditing({ title: null, value: '' });
                        }}
                        placeholder="e.g. From $80"
                        className="w-28 bg-gray-800 border border-red-600 text-white text-xs
                          rounded-lg px-2.5 py-1.5 focus:outline-none"
                        autoFocus
                      />
                      <button onClick={() => saveEdit(title)}
                        className="text-green-400 hover:text-green-300 transition-colors"
                        title="Save (Enter)">
                        <CheckCircle className="w-4 h-4" />
                      </button>
                      <button onClick={() => setEditing({ title: null, value: '' })}
                        className="text-gray-500 hover:text-gray-300 transition-colors"
                        title="Cancel (Escape)">
                        <X className="w-4 h-4" />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => startEdit(title, price)}
                        className="flex items-center gap-1.5 group/price">
                        <span className="text-red-400 font-bold text-sm group-hover/price:text-red-300 transition-colors">
                          {price}
                        </span>
                        <Edit3 className="w-3 h-3 text-gray-600 group-hover/price:text-gray-400 transition-colors" />
                      </button>

                      {isCustom && (
                        <button
                          onClick={() => handleReset(title)}
                          title="Reset to default price"
                          className="text-gray-600 hover:text-amber-400 transition-colors ml-1">
                          <RotateCcw className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <p className="text-gray-600 text-xs px-1">
        Tip: Any text format works — "From $80", "$80–$150", "Call for quote", etc.
        Click the reset icon (↺) to restore a service's original price.
      </p>
    </div>
  );
}

/* ─── 6. Shop Settings (Logo management) ─────────────────────────────────── */
function SettingsView({ logo, setLogo, showToast }) {
  const fileRef = useRef(null);

  function handleFile(e) {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) { showToast('⚠️ Image must be under 2 MB'); return; }
    const reader = new FileReader();
    reader.onload = ev => {
      setLogo(ev.target.result);
      showToast('✅ Logo updated — visible in navbar and sidebar');
    };
    reader.readAsDataURL(file);
  }

  function removeLogo() {
    setLogo(null);
    showToast('Logo removed — default ESC badge restored');
  }

  return (
    <div className="max-w-2xl space-y-5 animate-fade-in">

      {/* Logo card */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-5">
        <div>
          <h3 className="text-white font-bold text-sm mb-0.5">Website Logo</h3>
          <p className="text-gray-500 text-xs">
            The logo appears in the top navbar and the dashboard sidebar.
            Uploading a new one replaces it everywhere instantly.
          </p>
        </div>

        {/* Current logo preview */}
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 rounded-2xl bg-gray-800 border-2 border-gray-700
            flex items-center justify-center overflow-hidden shrink-0">
            {logo
              ? <img src={logo} alt="Current logo" className="w-full h-full object-contain p-1" />
              : <div className="bg-red-600 px-3 py-2 rounded-xl">
                  <span className="text-white font-extrabold text-sm tracking-wide">ESC</span>
                </div>
            }
          </div>
          <div>
            <p className="text-white font-semibold text-sm">
              {logo ? 'Custom logo active' : 'Default logo (ESC badge)'}
            </p>
            <p className="text-gray-500 text-xs mt-0.5">
              {logo ? 'Showing your uploaded image in all header areas.' : 'No custom logo uploaded yet.'}
            </p>
          </div>
        </div>

        {/* Hidden file input */}
        <input
          ref={fileRef}
          type="file"
          accept="image/png, image/jpeg, image/svg+xml, image/webp"
          className="hidden"
          onChange={handleFile}
        />

        {/* Action buttons */}
        <div className="flex flex-wrap gap-3">
          <Button variant="primary" size="md" onClick={() => fileRef.current?.click()}>
            <Upload className="w-4 h-4" />
            {logo ? 'Replace Logo' : 'Upload Logo'}
          </Button>
          {logo && (
            <Button variant="secondary" size="md" onClick={removeLogo}>
              <X className="w-4 h-4" />
              Remove Custom Logo
            </Button>
          )}
        </div>

        <p className="text-gray-600 text-xs border-t border-gray-800 pt-4">
          Recommended: PNG or SVG with transparent background · square or landscape format · max 2 MB
        </p>
      </div>

      {/* Live preview */}
      <div className="bg-gray-900 border border-gray-800 rounded-xl p-5">
        <p className="text-gray-400 text-xs font-semibold uppercase tracking-wide mb-3">Navbar Preview</p>
        <div className="bg-gray-950 rounded-xl px-4 h-12 flex items-center gap-2 border border-gray-800">
          {logo
            ? <img src={logo} alt="preview" className="h-7 w-auto max-w-[100px] object-contain rounded" />
            : <div className="bg-red-600 px-2 py-1 rounded-md">
                <span className="text-white font-extrabold text-xs">ESC</span>
              </div>
          }
          <div>
            <p className="text-white font-extrabold text-xs leading-tight">Escalante</p>
            <p className="text-gray-500 text-[9px]">Auto Repair</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Main AdminDashboard Export ──────────────────────────────────────────── */
export default function AdminDashboard({ activeView, bookingsApi, showToast, logo, setLogo }) {
  const { bookings, updateStatus } = bookingsApi;
  return (
    <div>
      {activeView === 'overview'       && <OverviewView      bookings={bookings} updateStatus={updateStatus} showToast={showToast} />}
      {activeView === 'inventory'      && <InventoryView     showToast={showToast} />}
      {activeView === 'photos'         && <PhotosView        showToast={showToast} />}
      {activeView === 'notes'          && <NotesView         bookings={bookings} showToast={showToast} />}
      {activeView === 'service-prices' && <ServicePricesView showToast={showToast} />}
      {activeView === 'settings'       && <SettingsView      logo={logo} setLogo={setLogo} showToast={showToast} />}
    </div>
  );
}
