const LS_STORE = "ark_store_v1";

const seed = {
  users: [
    // Admin/PM
    { id: "u_admin", name: "Admin", email: "admin@ark.nl", password: "admin", role: "admin" },
    { id: "u_pm", name: "Projectmanager", email: "pm@ark.nl", password: "admin", role: "pm" },

    // Clients (login accounts)
    {
      id: "u_c1",
      name: "Jan (Klant)",
      email: "jan@klant.nl",
      password: "1234",
      role: "client",
      clientId: "c1",
    },
    {
      id: "u_c2",
      name: "Sana (Klant)",
      email: "sana@klant.nl",
      password: "1234",
      role: "client",
      clientId: "c2",
    },
  ],

  clients: [
    { id: "c1", name: "Jan Jansen", email: "jan@klant.nl" },
    { id: "c2", name: "Sana Bakker", email: "sana@klant.nl" },
  ],

  projects: [
    {
      id: "p1",
      name: "Projectnaam 1",
      clientIds: ["c1"],
      files: [
        { id: "f1", name: "briefing.pdf", sizeLabel: "220 KB", date: "17.00.21" },
      ],
      feedback: [
        { id: "fb1", author: "Jan", text: "Kunnen we de header iets rustiger maken?", date: "17.00.21" },
      ],
    },
    {
      id: "p2",
      name: "Projectnaam 2",
      clientIds: ["c2"],
      files: [],
      feedback: [],
    },
  ],
};

function uid(prefix) {
  return `${prefix}_${Math.random().toString(16).slice(2)}_${Date.now().toString(16)}`;
}

export function ensureSeed() {
  const existing = localStorage.getItem(LS_STORE);
  if (!existing) localStorage.setItem(LS_STORE, JSON.stringify(seed));
}

export function readStore() {
  ensureSeed();
  const raw = localStorage.getItem(LS_STORE);
  return raw ? JSON.parse(raw) : JSON.parse(JSON.stringify(seed));
}

export function writeStore(next) {
  localStorage.setItem(LS_STORE, JSON.stringify(next));
}

/* ---------- Queries ---------- */
export function getClients() {
  return readStore().clients;
}

export function getUsers() {
  return readStore().users;
}

export function getProjects() {
  return readStore().projects;
}

export function getProjectById(id) {
  return readStore().projects.find((p) => p.id === id) ?? null;
}

export function getProjectsForClient(clientId) {
  return readStore().projects.filter((p) => p.clientIds.includes(clientId));
}

/* ---------- Mutations ---------- */
export function addClient({ name, email }) {
  const store = readStore();
  const id = uid("c");
  store.clients.push({ id, name, email });
  writeStore(store);
  return id;
}

export function deleteClient(clientId) {
  const store = readStore();
  store.clients = store.clients.filter((c) => c.id !== clientId);
  // remove client from projects
  store.projects = store.projects.map((p) => ({
    ...p,
    clientIds: p.clientIds.filter((id) => id !== clientId),
  }));
  // remove login user for that client (if any)
  store.users = store.users.filter((u) => u.clientId !== clientId);
  writeStore(store);
}

export function addProject({ name, clientIds }) {
  const store = readStore();
  const id = uid("p");
  store.projects.unshift({
    id,
    name,
    clientIds: clientIds ?? [],
    files: [],
    feedback: [],
  });
  writeStore(store);
  return id;
}

export function addClientToProject({ projectId, clientId }) {
  const store = readStore();
  const p = store.projects.find((x) => x.id === projectId);
  if (!p) return;
  if (!p.clientIds.includes(clientId)) p.clientIds.push(clientId);
  writeStore(store);
}

export function removeClientFromProject({ projectId, clientId }) {
  const store = readStore();
  const p = store.projects.find((x) => x.id === projectId);
  if (!p) return;
  p.clientIds = p.clientIds.filter((id) => id !== clientId);
  writeStore(store);
}

export function addFileToProject({ projectId, fileName, sizeLabel }) {
  const store = readStore();
  const p = store.projects.find((x) => x.id === projectId);
  if (!p) return;

  const date = new Date();
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const yy = String(date.getFullYear()).slice(-2);
  const stamp = `${dd}.${mm}.${yy}`;

  p.files.unshift({
    id: uid("f"),
    name: fileName,
    sizeLabel: sizeLabel ?? "",
    date: stamp,
  });

  writeStore(store);
}

export function deleteFile({ projectId, fileId }) {
  const store = readStore();
  const p = store.projects.find((x) => x.id === projectId);
  if (!p) return;
  p.files = p.files.filter((f) => f.id !== fileId);
  writeStore(store);
}

export function addFeedback({ projectId, author, text }) {
  const store = readStore();
  const p = store.projects.find((x) => x.id === projectId);
  if (!p) return;

  const date = new Date();
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const yy = String(date.getFullYear()).slice(-2);
  const stamp = `${dd}.${mm}.${yy}`;

  p.feedback.unshift({ id: uid("fb"), author, text, date: stamp });
  writeStore(store);
}
