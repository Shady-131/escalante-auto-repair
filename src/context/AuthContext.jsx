import { createContext, useState, useEffect, useCallback } from 'react';

// ─── Constants ────────────────────────────────────────────────────────────────
const KEY_USERS   = 'esc_users';
const KEY_SESSION = 'esc_session';
export const INVITE_CODE = 'ESC-ADMIN-2026'; // exported so Portal can hint at format

// ─── Pre-seeded demo accounts (always available, even after localStorage clear) ─
const SEED_USERS = [
  {
    id: 'u001',
    firstName: 'E.', lastName: 'Escalante',
    name: 'E. Escalante',
    email: 'admin@escalante.com',
    phone: '+1 435-233-8048',
    password: 'admin123',
    role: 'admin',
  },
  {
    id: 'u002',
    firstName: 'John', lastName: 'Doe',
    name: 'John Doe',
    email: 'john@demo.com',
    phone: '+1 555-000-0001',
    password: 'customer123',
    role: 'customer',
  },
];

// ─── localStorage helpers ─────────────────────────────────────────────────────
function readUsers() {
  try {
    const raw = localStorage.getItem(KEY_USERS);
    if (raw) {
      const parsed = JSON.parse(raw);
      // Merge: keep any registered users, always ensure seeds exist by email
      const seedEmails = new Set(SEED_USERS.map(u => u.email));
      const extras = parsed.filter(u => !seedEmails.has(u.email));
      return [...SEED_USERS, ...extras];
    }
  } catch { /* storage unavailable */ }
  return SEED_USERS;
}

function writeUsers(users) {
  try { localStorage.setItem(KEY_USERS, JSON.stringify(users)); } catch { /* noop */ }
}

function readSession() {
  try {
    const raw = localStorage.getItem(KEY_SESSION);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

function writeSession(user) {
  try {
    if (user) localStorage.setItem(KEY_SESSION, JSON.stringify(user));
    else       localStorage.removeItem(KEY_SESSION);
  } catch { /* noop */ }
}

// ─── Context ──────────────────────────────────────────────────────────────────
export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [users, setUsers] = useState(readUsers);
  const [user,  setUser]  = useState(readSession);   // null = logged out

  // Persist users & session whenever they change
  useEffect(() => { writeUsers(users); }, [users]);
  useEffect(() => { writeSession(user); }, [user]);

  // ── login ──────────────────────────────────────────────────────────────────
  const login = useCallback((email, password) => {
    const found = users.find(
      u =>
        u.email.toLowerCase() === email.trim().toLowerCase() &&
        u.password === password
    );
    if (!found) return { ok: false, error: 'Incorrect email or password.' };

    // Store only the safe session slice (no password)
    const session = { id: found.id, name: found.name, email: found.email, role: found.role, photo: found.photo || null };
    setUser(session);
    return { ok: true, user: session };
  }, [users]);

  // ── register ───────────────────────────────────────────────────────────────
  const register = useCallback(({
    firstName, lastName, email, phone, password, role, inviteCode, photo,
  }) => {
    // Invite-code gate for staff
    if (role === 'admin' && inviteCode.trim() !== INVITE_CODE) {
      return { ok: false, error: 'Invalid invite code. Please contact the shop owner.' };
    }
    // Duplicate email check
    const emailLower = email.trim().toLowerCase();
    if (users.some(u => u.email.toLowerCase() === emailLower)) {
      return { ok: false, error: 'An account with this email already exists.' };
    }

    const newUser = {
      id:        `u${Date.now()}`,
      firstName, lastName,
      name:      `${firstName.trim()} ${lastName.trim()}`,
      email:     emailLower,
      phone:     phone.trim(),
      password,  // plain-text is fine for a frontend demo
      role,
      photo:     photo || null,
    };

    setUsers(prev => [...prev, newUser]);

    // Auto-login immediately after successful registration
    const session = { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role, photo: newUser.photo || null };
    setUser(session);
    return { ok: true, user: session };
  }, [users]);

  // ── logout ─────────────────────────────────────────────────────────────────
  const logout = useCallback(() => setUser(null), []);

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}