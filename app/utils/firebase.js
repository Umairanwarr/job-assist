import { initializeApp, getApps } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDC8_MlRgzoEcjb1w_ol3mcbb0KzLPSuDA",
  authDomain: "job-assist-337d1.firebaseapp.com",
  projectId: "job-assist-337d1",
  storageBucket: "job-assist-337d1.firebasestorage.app",
  messagingSenderId: "961691046815",
  appId: "1:961691046815:web:bc94d58e5b6fcfafaa63aa",
  measurementId: "G-CGK7NEFZNB"
};

// Initialize Firebase
let app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
let analytics;
let auth;

// Only initialize analytics on the client side
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

// Initialize authentication
auth = getAuth(app);

// Initialize Firestore
const db = getFirestore(app);

export { app, analytics, auth, db };