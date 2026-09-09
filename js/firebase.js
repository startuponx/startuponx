// ============================================================
// firebase.js — Shared Firebase Auth (Google Sign-In)
// ============================================================
// SETUP INSTRUCTIONS:
// 1. Go to console.firebase.google.com
// 2. Create a project → Add web app → copy your config below
// 3. Enable Authentication → Sign-in method → Google
// 4. Add your domain to Authorized domains in Firebase console
// ============================================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged }
  from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore, collection, addDoc, query, where, getDocs, serverTimestamp }
  from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// ▼▼▼ PASTE YOUR FIREBASE CONFIG HERE ▼▼▼
const firebaseConfig = {
  apiKey: "AIzaSyBo0znzdeRwlclOvrSouUzRja4yFHUu6Tc",
  authDomain: "startuponx-e228c.firebaseapp.com",
  projectId: "startuponx-e228c",
  storageBucket: "startuponx-e228c.firebasestorage.app",
  messagingSenderId: "333136775467",
  appId: "1:333136775467:web:30ccb507b40a13b1cc9d6e",
  measurementId: "G-9MJEJT5ELL"
};
// ▲▲▲ END CONFIG ▲▲▲

const app  = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db   = getFirestore(app);
const provider = new GoogleAuthProvider();

// ── Auth helpers ──────────────────────────
export async function signInWithGoogle() {
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (err) {
    console.error("Sign-in error:", err);
    throw err;
  }
}

export async function signOutUser() {
  await signOut(auth);
}

export function onAuth(callback) {
  return onAuthStateChanged(auth, callback);
}

export function currentUser() {
  return auth.currentUser;
}

// ── Firestore helpers ─────────────────────
export async function submitStartup(data) {
  return await addDoc(collection(db, "startups"), {
    ...data,
    status: "pending",      // "pending" → admin approves → "live"
    submittedAt: serverTimestamp()
  });
}

export async function getMyListings(uid) {
  const q = query(collection(db, "startups"), where("uid", "==", uid));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

export async function getLiveStartups() {
  const q = query(collection(db, "startups"), where("status", "==", "live"));
  const snap = await getDocs(q);
  return snap.docs.map(d => ({ id: d.id, ...d.data() }));
}

export { auth, db };
