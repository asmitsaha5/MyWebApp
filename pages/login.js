import { useState, useEffect } from "react";
import { auth } from "../firebase"; // Import the auth object
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth"; // Auth methods
import { useRouter } from "next/router"; // For navigation

export default function Login() {
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

    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
            alert("User logged in successfully!");
            router.push("/firestore"); // Redirect to Firestore page after login
        } catch (err) {
            setError(err.message);
        }
    };

    const redirectToSignup = () => {
        router.push("/signup"); // Redirect to Signup page
    };

    return (
        <div style={{ padding: "20px" }}>
            <h1>Log In</h1>
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
            <button onClick={handleLogin} style={{ marginBottom: "10px" }}>
                Log In
            </button>
            <button onClick={redirectToSignup} style={{ marginBottom: "10px" }}>
                Go to Sign Up
            </button>
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
}
