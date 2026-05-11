import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCAdpJT3kFwM2FxTk9WpVVEp7U4K5B8u5w",
  authDomain: "family-friend-chat-2026.firebaseapp.com",
  projectId: "family-friend-chat-2026",
  storageBucket: "family-friend-chat-2026.firebasestorage.app",
  messagingSenderId: "10011513215",
  appId: "1:10011513215:web:791637c602942dd1798a4a",
  measurementId: "G-B3KD0GMRL6"
};

const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);