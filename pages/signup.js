import { useState, useEffect } from "react";
import { auth } from "../firebase"; // Import Firebase auth
import { createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth"; // Auth methods
import { useRouter } from "next/router"; // For navigation

export default function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    // Redirect to Firestore if already logged in
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                router.push("/firestore"); // Redirect to Firestore page if logged in
            }
        });

        return () => unsubscribe(); // Clean up the listener
    }, [router]);

    const handleSignup = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            alert("User signed up successfully!");
            router.push("/firestore"); // Redirect to Firestore page after successful signup
        } catch (err) {
            setError(err.message);
        }
    };

    const redirectToLogin = () => {
        router.push("/login"); // Redirect to Login page
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>Sign Up</h1>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ display: "block", marginBottom: "10px" }}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ display: "block", marginBottom: "10px" }}
            />
            <button onClick={handleSignup} style={{ marginBottom: "10px" }}>
                Sign Up
            </button>
            <button onClick={redirectToLogin} style={{ marginBottom: "10px" }}>
                Go to Log In
            </button>
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
}
