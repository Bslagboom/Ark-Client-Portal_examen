// src/auth/authService.js
import { users } from "../data/mockData";

let currentUser = null;

export function login(email, password) {
  const user = users.find(
    u => u.email === email && u.password === password
  );
  if (!user) throw new Error("Ongeldige inloggegevens");
  currentUser = user;
  return user;
}

export function logout() {
  currentUser = null;
}

export function getCurrentUser() {
  return currentUser;
}
