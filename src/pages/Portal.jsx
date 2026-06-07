import { useState } from 'react';
import {
  Wrench, Lock, Eye, EyeOff,
  LogIn, UserPlus, ShieldCheck, ChevronRight,
  User, Upload,
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import Button from '../components/ui/Button';
import InputField from '../components/ui/InputField';

// ─── Tab config ───────────────────────────────────────────────────────────────
const TABS = [
  { id: 'login',    label: 'Sign In',      Icon: LogIn       },
  { id: 'register', label: 'Register',     Icon: UserPlus    },
  { id: 'staff',    label: 'Staff Access', Icon: ShieldCheck },
];

// ─── Role selector options ────────────────────────────────────────────────────
const ROLE_OPTIONS = [
  {
    value: 'customer',
    label: 'Customer',
    desc:  'Book appointments & track your repairs',
    icon:  '👤',
  },
  {
    value: 'admin',
    label: 'Mechanic / Admin',
    desc:  'Staff access — requires an invite code',
    icon:  '🔧',
  },
];

// ─── Small helper: password visibility toggle ─────────────────────────────────
function EyeToggle({ show, onToggle }) {
  return (
    <button
      type="button"
      onClick={onToggle}
      tabIndex={-1}
      className="absolute right-3 top-[34px] text-gray-500 hover:text-gray-300 transition-colors"
      aria-label={show ? 'Hide password' : 'Show password'}
    >
      {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
    </button>
  );
}

// ─── Flash message ────────────────────────────────────────────────────────────
function Flash({ text, type }) {
  if (!text) return null;
  const isOk = type === 'success';
  return (
    <div className={`mx-4 sm:mx-6 mt-4 sm:mt-5 px-4 py-3 rounded-xl text-sm font-medium animate-fade-in
      ${isOk
        ? 'bg-green-900/30 text-green-400 border border-green-700/40'
        : 'bg-red-900/30  text-red-400  border border-red-700/40'}`}>
      {text}
    </div>
  );
}

// ─── Main Portal component ────────────────────────────────────────────────────
export default function Portal({ onLogin }) {
  const { login, register } = useAuth();

  const [tab,     setTab]     = useState('login');
  const [flash,   setFlash]   = useState({ text: '', type: '' });
  const [loading, setLoading] = useState(false);
  const [showPw,  setShowPw]  = useState(false);

  // Per-tab form state (isolated so switching tabs doesn't bleed data)
  const [lf, setLF] = useState({ email: '', password: '' });
  const [rf, setRF] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    password: '', confirm: '', role: 'customer', inviteCode: '',
    photo: null,
  });
  const [sf, setSF] = useState({ email: '', password: '' });

  // Helpers
  const L = (k, v) => setLF(f => ({ ...f, [k]: v }));
  const R = (k, v) => setRF(f => ({ ...f, [k]: v }));
  const S = (k, v) => setSF(f => ({ ...f, [k]: v }));

  function flash_(text, type = 'error') {
    setFlash({ text, type });
    if (type !== 'success') setTimeout(() => setFlash({ text: '', type: '' }), 4500);
  }

  function switchTab(id) { setTab(id); setFlash({ text: '', type: '' }); setShowPw(false); }

  // ── Login handler ──────────────────────────────────────────────────────────
  function handleLogin() {
    if (!lf.email || !lf.password) { flash_('Please enter your email and password.'); return; }
    setLoading(true);
    const res = login(lf.email, lf.password);
    setLoading(false);
    if (!res.ok) { flash_(res.error); return; }
    onLogin();
  }

  // ── Register handler ───────────────────────────────────────────────────────
  function handleRegister() {
    const { firstName, lastName, email, password, confirm, role, inviteCode, phone } = rf;
    if (!firstName || !lastName || !email || !password) {
      flash_('Please fill in all required fields.'); return;
    }
    if (password.length < 6) { flash_('Password must be at least 6 characters.'); return; }
    if (password !== confirm) { flash_('Passwords do not match.'); return; }

    setLoading(true);
    const res = register({ firstName, lastName, email, phone, password, role, inviteCode, photo: rf.photo });
    setLoading(false);

    if (!res.ok) { flash_(res.error); return; }
    flash_(`Welcome, ${res.user.name}! Redirecting…`, 'success');
    setTimeout(() => onLogin(), 900);
  }

  // ── Staff login handler ────────────────────────────────────────────────────
  function handleStaffLogin() {
    if (!sf.email || !sf.password) { flash_('Please enter your staff credentials.'); return; }
    setLoading(true);
    const res = login(sf.email, sf.password);
    setLoading(false);
    if (!res.ok)                      { flash_(res.error);                                        return; }
    if (res.user.role !== 'admin')    { flash_('This account does not have staff privileges.');   return; }
    onLogin();
  }

  // ── Demo quick-login ───────────────────────────────────────────────────────
  function demoLogin(role) {
    const creds = role === 'admin'
      ? { email: 'admin@escalante.com', password: 'admin123' }
      : { email: 'john@demo.com',       password: 'customer123' };
    const res = login(creds.email, creds.password);
    if (res.ok) onLogin();
  }

  return (
    <main className="min-h-screen bg-gray-950 flex items-center justify-center px-3 sm:px-4 py-10 sm:py-16">
      <div className="w-full max-w-md">

        {/* ── Card ── */}
        <div className="bg-gray-900 rounded-2xl shadow-2xl border border-gray-800 overflow-hidden">

          {/* Header */}
          <div className="bg-gradient-to-br from-gray-950 via-[#1a0505] to-gray-900 px-5 sm:px-8 py-6 sm:py-8 text-center relative overflow-hidden">
            {/* subtle dot grid */}
            <div className="absolute inset-0 opacity-[0.04]"
              style={{ backgroundImage: 'radial-gradient(circle, #8B1A1A 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
            <div className="relative">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full
                bg-red-900/30 border border-red-700/40 mb-3">
                <Wrench className="w-7 h-7 text-red-400" strokeWidth={1.75} />
              </div>
              <p className="text-red-400 text-[11px] uppercase tracking-widest mb-1 font-semibold">
                Customer &amp; Staff Portal
              </p>
              <p className="text-white text-xl font-extrabold">Escalante Auto Repair</p>
              <p className="text-gray-500 text-sm mt-1">
                Sign in to manage your vehicles &amp; appointments
              </p>
            </div>
          </div>

          {/* Flash */}
          <Flash {...flash} />

          {/* Tabs */}
          <div className="flex bg-gray-800/40 mx-4 sm:mx-6 mt-4 sm:mt-5 rounded-xl overflow-hidden border border-gray-700/50">
            {TABS.map(({ id, label, Icon }) => (
              <button
                key={id}
                onClick={() => switchTab(id)}
                className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs
                  font-semibold transition-all duration-150
                  ${tab === id
                    ? 'bg-red-600 text-white shadow'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700/50'}`}
              >
                <Icon className="w-3.5 h-3.5" />
                {label}
              </button>
            ))}
          </div>

          {/* ── Forms ── */}
          <div className="px-4 sm:px-6 py-5 sm:py-6">

            {/* ──────────────────── SIGN IN ──────────────────── */}
            {tab === 'login' && (
              <div className="space-y-4 animate-fade-in">
                <InputField id="l-email" label="Email Address" type="email"
                  placeholder="your@email.com"
                  value={lf.email} onChange={e => L('email', e.target.value)} />

                <div className="relative">
                  <InputField id="l-pass" label="Password"
                    type={showPw ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={lf.password} onChange={e => L('password', e.target.value)} />
                  <EyeToggle show={showPw} onToggle={() => setShowPw(v => !v)} />
                </div>

                <Button variant="primary" size="lg"
                  className="w-full justify-center mt-1"
                  onClick={handleLogin} disabled={loading}>
                  <LogIn className="w-4 h-4" />
                  {loading ? 'Signing in…' : 'Sign In'}
                </Button>

                {/* Demo shortcuts */}
                <div className="pt-3 border-t border-gray-800">
                  <p className="text-center text-[11px] text-gray-600 mb-3 uppercase tracking-wide">
                    Quick demo access
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { role: 'customer', label: 'Customer Demo' },
                      { role: 'admin',    label: 'Admin Demo'    },
                    ].map(({ role, label }) => (
                      <button key={role} onClick={() => demoLogin(role)}
                        className="py-2 px-3 rounded-xl border border-gray-700 text-gray-400
                          hover:border-red-700 hover:text-red-400 hover:bg-red-900/10
                          text-xs font-medium transition-all flex items-center justify-center gap-1.5">
                        {role === 'admin' ? <ShieldCheck className="w-3.5 h-3.5" /> : <UserPlus className="w-3.5 h-3.5" />}
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                <p className="text-center text-xs text-gray-600 pt-1">
                  No account?{' '}
                  <button onClick={() => switchTab('register')}
                    className="text-red-400 hover:underline font-medium">
                    Register here
                  </button>
                </p>
              </div>
            )}

            {/* ──────────────────── REGISTER ──────────────────── */}
            {tab === 'register' && (
              <div className="space-y-3 animate-fade-in">
                <div className="grid grid-cols-2 gap-3">
                  <InputField id="r-first" label="First Name" placeholder="John"
                    value={rf.firstName} onChange={e => R('firstName', e.target.value)} />
                  <InputField id="r-last" label="Last Name" placeholder="Doe"
                    value={rf.lastName}  onChange={e => R('lastName',  e.target.value)} />
                </div>

                <InputField id="r-email" label="Email Address" type="email"
                  placeholder="you@email.com"
                  value={rf.email} onChange={e => R('email', e.target.value)} />

                <InputField id="r-phone" label="Phone (optional)" type="tel"
                  placeholder="+1 435-000-0000"
                  value={rf.phone} onChange={e => R('phone', e.target.value)} />

                <div className="relative">
                  <InputField id="r-pass" label="Password"
                    type={showPw ? 'text' : 'password'}
                    placeholder="Min. 6 characters"
                    value={rf.password} onChange={e => R('password', e.target.value)} />
                  <EyeToggle show={showPw} onToggle={() => setShowPw(v => !v)} />
                </div>

                <InputField id="r-confirm" label="Confirm Password"
                  type={showPw ? 'text' : 'password'}
                  placeholder="Repeat password"
                  value={rf.confirm} onChange={e => R('confirm', e.target.value)} />

                {/* Role selector */}
                <div>
                  <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wide">
                    Account Type
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {ROLE_OPTIONS.map(opt => (
                      <button key={opt.value} type="button"
                        onClick={() => R('role', opt.value)}
                        className={`text-left p-3 rounded-xl border transition-all
                          ${rf.role === opt.value
                            ? 'border-red-600 bg-red-900/20 text-white'
                            : 'border-gray-700 text-gray-400 hover:border-gray-600 hover:bg-gray-800/40'}`}>
                        <p className="font-semibold text-xs flex items-center gap-1.5">
                          <span>{opt.icon}</span> {opt.label}
                        </p>
                        <p className="text-gray-500 mt-0.5 text-[11px] leading-snug">{opt.desc}</p>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Invite code + photo — slides in when Mechanic/Admin is selected */}
                {rf.role === 'admin' && (
                  <>
                    <div className="animate-fade-in space-y-2">
                      <div className="flex items-start gap-2 bg-amber-900/10 border border-amber-700/30
                        rounded-xl p-3 text-xs text-amber-400">
                        <Lock className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                        Staff registration requires a valid invite code provided by the shop owner.
                      </div>
                      <InputField id="r-invite" label="Staff Invite Code"
                        placeholder="ESC-XXXX-XXXX"
                        value={rf.inviteCode} onChange={e => R('inviteCode', e.target.value)} />
                    </div>

                    {/* Profile photo upload */}
                    <div className="animate-fade-in">
                      <label className="block text-xs font-semibold text-gray-400 mb-2 uppercase tracking-wide">
                        Profile Photo <span className="text-gray-600 normal-case font-normal">(optional)</span>
                      </label>
                      <div className="flex items-center gap-4">
                        {/* Avatar preview */}
                        <div className="w-14 h-14 rounded-full bg-gray-800 border-2 border-gray-700
                          flex items-center justify-center overflow-hidden shrink-0">
                          {rf.photo
                            ? <img src={rf.photo} alt="Preview" className="w-full h-full object-cover" />
                            : <User className="w-6 h-6 text-gray-500" strokeWidth={1.5} />
                          }
                        </div>
                        {/* File input */}
                        <div className="flex-1 min-w-0">
                          <input
                            type="file"
                            accept="image/*"
                            id="r-photo"
                            className="hidden"
                            onChange={e => {
                              const file = e.target.files[0];
                              if (!file) return;
                              if (file.size > 2 * 1024 * 1024) { flash_('Image must be under 2MB.'); return; }
                              const reader = new FileReader();
                              reader.onload = ev => R('photo', ev.target.result);
                              reader.readAsDataURL(file);
                            }}
                          />
                          <label htmlFor="r-photo"
                            className="inline-flex items-center gap-2 px-3 py-2 rounded-xl
                              border border-dashed border-gray-600 hover:border-red-600
                              text-gray-400 hover:text-red-400 text-xs font-medium
                              cursor-pointer transition-all">
                            <Upload className="w-3.5 h-3.5" />
                            {rf.photo ? 'Change photo' : 'Upload photo'}
                          </label>
                          {rf.photo && (
                            <button type="button" onClick={() => R('photo', null)}
                              className="block mt-1.5 text-[11px] text-gray-600 hover:text-red-400 transition-colors">
                              Remove
                            </button>
                          )}
                          <p className="text-gray-600 text-[11px] mt-1">JPG, PNG · max 2 MB</p>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                <Button variant="primary" size="lg"
                  className="w-full justify-center mt-1"
                  onClick={handleRegister} disabled={loading}>
                  <UserPlus className="w-4 h-4" />
                  {loading ? 'Creating account…' : 'Create Account'}
                </Button>

                <p className="text-center text-xs text-gray-600">
                  Already have an account?{' '}
                  <button onClick={() => switchTab('login')}
                    className="text-red-400 hover:underline font-medium">
                    Sign in
                  </button>
                </p>
              </div>
            )}

            {/* ──────────────────── STAFF ACCESS ──────────────────── */}
            {tab === 'staff' && (
              <div className="space-y-4 animate-fade-in">
                <div className="flex items-start gap-3 bg-red-900/10 border border-red-800/40
                  rounded-xl p-3">
                  <Lock className="w-4 h-4 text-red-500 shrink-0 mt-0.5" strokeWidth={1.75} />
                  <p className="text-xs text-red-400 leading-relaxed">
                    Mechanic &amp; Admin access only. Unauthorized access attempts are prohibited.
                  </p>
                </div>

                <InputField id="s-email" label="Staff Email" type="email"
                  placeholder="admin@escalante.com"
                  value={sf.email} onChange={e => S('email', e.target.value)} />

                <div className="relative">
                  <InputField id="s-pass" label="Password"
                    type={showPw ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={sf.password} onChange={e => S('password', e.target.value)} />
                  <EyeToggle show={showPw} onToggle={() => setShowPw(v => !v)} />
                </div>

                <Button variant="danger" size="lg"
                  className="w-full justify-center"
                  onClick={handleStaffLogin} disabled={loading}>
                  <ShieldCheck className="w-4 h-4" />
                  {loading ? 'Verifying…' : 'Staff Sign In'}
                </Button>

                <div className="pt-2 border-t border-gray-800 text-center">
                  <button onClick={() => demoLogin('admin')}
                    className="text-xs text-gray-600 hover:text-red-400 transition-colors
                      flex items-center gap-1 mx-auto">
                    Use demo admin credentials
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Footer note */}
        <p className="text-center text-[11px] text-gray-700 mt-5">
          © 2026 Escalante Auto Repair · All rights reserved
        </p>

      </div>
    </main>
  );
}