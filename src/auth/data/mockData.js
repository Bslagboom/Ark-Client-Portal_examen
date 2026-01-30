// src/data/mockData.js

export const users = [
  { id: 1, name: "Admin", email: "admin@ark.nl", password: "admin", role: "pm" },
  { id: 2, name: "Jan Jansen", email: "jan@klant.nl", password: "1234", role: "client" },
  { id: 3, name: "Lisa de Vries", email: "lisa@klant.nl", password: "1234", role: "client" }
];

export const projects = [
  {
    id: 1,
    title: "Website redesign",
    status: "Revisie",
    memberIds: [2]
  },
  {
    id: 2,
    title: "Brand identity",
    status: "Concept",
    memberIds: [3]
  }
];
