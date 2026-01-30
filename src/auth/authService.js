import { ensureSeed } from "../data/mockData.js";

const LS_AUTH = "ark_auth_user";

export function getUser() {
  ensureSeed();
  const raw = localStorage.getItem(LS_AUTH);
  return raw ? JSON.parse(raw) : null;
}

export function login(email, password) {
  ensureSeed();
  const raw = localStorage.getItem("ark_store_v1");
  const store = raw ? JSON.parse(raw) : null;
  if (!store) return { ok: false, error: "Store ontbreekt" };

  const user = store.users.find(
    (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
  );

  if (!user) return { ok: false, error: "Onjuiste inloggegevens" };

  const safeUser = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    clientId: user.clientId ?? null,
  };

  localStorage.setItem(LS_AUTH, JSON.stringify(safeUser));
  return { ok: true, user: safeUser };
}

export function logout() {
  localStorage.removeItem(LS_AUTH);
}
