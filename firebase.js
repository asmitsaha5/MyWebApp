// Import the functions you need from the Firebase SDKs
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDAvlXjUTJJCKShZi5Dg-Q1K3xJVUhgEEQ",
  authDomain: "my-web-app-1081e.firebaseapp.com",
  projectId: "my-web-app-1081e",
  storageBucket: "my-web-app-1081e.firebasestorage.app",
  messagingSenderId: "983242933901",
  appId: "1:983242933901:web:03a9f7957882c81f6b84c4",
  measurementId: "G-ZMY3L5VF2S",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app); // For Authentication
const db = getFirestore(app); // For Firestore Database

// Export services for use in your app
export { auth, db };
