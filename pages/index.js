import { useEffect } from "react";
import { auth } from "../firebase"; // Import Firebase auth
import { onAuthStateChanged } from "firebase/auth"; // Auth listener
import { useRouter } from "next/router"; // For navigation

export default function Home() {
  const router = useRouter();

  // Redirect authenticated users to Firestore
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push("/firestore"); // Redirect if logged in
      }
    });

    return () => unsubscribe(); // Clean up the listener
  }, [router]);

  const goToLogin = () => {
    router.push("/login"); // Navigate to the login page
  };

  const goToSignup = () => {
    router.push("/signup"); // Navigate to the signup page
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Welcome to My Web App</h1>
      <p>Start storing and managing your text data easily!</p>
      <div style={{ marginTop: "20px" }}>
        <button onClick={goToLogin} style={{ marginRight: "10px" }}>
          Log In
        </button>
        <button onClick={goToSignup}>Sign Up</button>
      </div>
    </div>
  );
}
