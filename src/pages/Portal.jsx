import { useState } from 'react';
import {
  Wrench, Eye, EyeOff,
  LogIn, UserPlus, ShieldCheck,
} from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import Button from '../components/ui/Button';
import InputField from '../components/ui/InputField';

// ─── Tab config ───────────────────────────────────────────────────────────────
// A single universal Sign In handles every role (customer / mechanic / admin);
// routing to the right dashboard happens after login based on the saved role.
const TABS = [
  { id: 'login',    label: 'Sign In',  Icon: LogIn    },
  { id: 'register', label: 'Register', Icon: UserPlus },
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
    password: '', confirm: '',
  });

  // Helpers
  const L = (k, v) => setLF(f => ({ ...f, [k]: v }));
  const R = (k, v) => setRF(f => ({ ...f, [k]: v }));

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
    const { firstName, lastName, email, password, confirm, phone } = rf;
    if (!firstName || !lastName || !email || !password) {
      flash_('Please fill in all required fields.'); return;
    }
    if (password.length < 6) { flash_('Password must be at least 6 characters.'); return; }
    if (password !== confirm) { flash_('Passwords do not match.'); return; }

    setLoading(true);
    // Public registration always creates a customer account. Staff (mechanic /
    // admin) accounts are provisioned by the shop owner, never self-registered.
    const res = register({ firstName, lastName, email, phone, password, role: 'customer' });
    setLoading(false);

    if (!res.ok) { flash_(res.error); return; }
    flash_(`Welcome, ${res.user.name}! Redirecting…`, 'success');
    setTimeout(() => onLogin(), 900);
  }

  // ── Demo quick-login ───────────────────────────────────────────────────────
  function demoLogin(role) {
    const creds = {
      admin:    { email: 'admin@escalante.com',    password: 'admin123'    },
      mechanic: { email: 'mechanic@escalante.com', password: 'mechanic123' },
      customer: { email: 'john@demo.com',          password: 'customer123' },
    }[role] ?? { email: 'john@demo.com', password: 'customer123' };
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
                      { role: 'customer', label: 'Customer Demo', Icon: UserPlus    },
                      { role: 'mechanic', label: 'Mechanic Demo', Icon: Wrench      },
                      { role: 'admin',    label: 'Admin Demo',    Icon: ShieldCheck, full: true },
                    ].map(({ role, label, Icon, full }) => (
                      <button key={role} onClick={() => demoLogin(role)}
                        className={`py-2 px-3 rounded-xl border border-gray-700 text-gray-400
                          hover:border-red-700 hover:text-red-400 hover:bg-red-900/10
                          text-xs font-medium transition-all flex items-center justify-center gap-1.5
                          ${full ? 'col-span-2' : ''}`}>
                        <Icon className="w-3.5 h-3.5" />
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
                <p className="text-xs text-gray-500 leading-relaxed text-center px-2 -mt-1 mb-1">
                  Create a free account to book services and track your repairs.
                </p>
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

                {/* Mechanic onboarding note — staff accounts are never self-served */}
                <p className="text-center text-[11px] text-gray-600 leading-relaxed
                  border-t border-gray-800 pt-3 px-2">
                  Want to join the team? Staff accounts are set up by the shop —
                  please <span className="text-gray-400 font-medium">contact us to apply as a mechanic</span>.
                </p>
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