// ─── Role-based permissions (frontend-only) ────────────────────────────────────
//
// IMPORTANT: This is UI-level gating for the demo only. Roles live in
// localStorage and can be edited by any user in DevTools, so this does NOT
// provide real security. Once a backend is added, every admin-only action
// (logo, prices, spare parts, settings) MUST be re-checked server-side.

export const ROLES = {
  CUSTOMER: 'customer',
  MECHANIC: 'mechanic',
  ADMIN:    'admin',
};

// Staff dashboard views reserved for the owner/admin (business-level settings
// + staff management). Mechanics cannot even open these.
// Note: inventory (Spare Parts) is intentionally NOT here — mechanics may VIEW
// it, but only admins may MANAGE it (see canManageInventory).
export const ADMIN_ONLY_VIEWS = ['service-prices', 'settings', 'staff'];

// A staff member is anyone who works at the shop (mechanic or admin/owner).
export const isStaffRole = (role) => role === ROLES.MECHANIC || role === ROLES.ADMIN;

// Can the given role open a particular staff dashboard view?
export function canAccessView(role, view) {
  if (role === ROLES.ADMIN)    return true;                          // owner: full access
  if (role === ROLES.MECHANIC) return !ADMIN_ONLY_VIEWS.includes(view);
  return false;                                                      // customers don't use staff views
}

// Can the role MANAGE spare parts (add / delete / edit price / adjust stock)?
// Mechanics get a read-only inventory view; only the owner/admin can edit.
export const canManageInventory = (role) => role === ROLES.ADMIN;

// Human-readable label for the sidebar / header.
export function roleLabel(role) {
  if (role === ROLES.ADMIN)    return 'Administrator';
  if (role === ROLES.MECHANIC) return 'Mechanic';
  return 'Customer';
}
