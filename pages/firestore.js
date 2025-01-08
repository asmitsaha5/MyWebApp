import { useState, useEffect } from "react";
import { auth, db } from "../firebase"; // Import Firebase auth and Firestore
import { collection, addDoc, getDocs, query, where } from "firebase/firestore"; // Firestore methods
import { onAuthStateChanged, signOut } from "firebase/auth"; // Auth methods
import { useRouter } from "next/router"; // For navigation

export default function FirestorePage() {
    const [text, setText] = useState("");
    const [texts, setTexts] = useState([]);
    const [user, setUser] = useState(null); // Store the logged-in user's info
    const router = useRouter(); // For navigation

    // Add text to Firestore
    const addText = async () => {
        try {
            if (!user) {
                alert("Please log in to add text!");
                return;
            }
            await addDoc(collection(db, "texts"), {
                text,
                userId: user.uid, // Store the user's UID
                userEmail: user.email,
                createdAt: new Date(),
            });
            alert("Text added successfully!");
            setText(""); // Clear the input
            fetchTexts(); // Refresh the text list
        } catch (err) {
            console.error("Error adding text:", err.message);
        }
    };

    // Fetch texts from Firestore (only texts for the logged-in user)
    const fetchTexts = async () => {
        try {
            if (!user) return; // No need to fetch if there's no logged-in user

            const q = query(
                collection(db, "texts"),
                where("userId", "==", user.uid) // Filter texts by the user's UID
            );
            const querySnapshot = await getDocs(q);
            const textsArray = querySnapshot.docs.map((doc) => doc.data());
            setTexts(textsArray);
        } catch (err) {
            console.error("Error fetching texts:", err.message);
        }
    };

    // Listen for auth state changes (logged-in user)
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
            } else {
                router.push("/login"); // Redirect to login if not logged in
            }
        });

        return () => unsubscribe(); // Clean up the listener
    }, [router]);

    // Log out the user
    const handleLogout = async () => {
        try {
            await signOut(auth);
            alert("Logged out successfully!");
            router.push("/login"); // Redirect to login page
        } catch (err) {
            console.error("Error logging out:", err.message);
        }
    };

    // Fetch texts when the user is logged in
    useEffect(() => {
        if (user) fetchTexts();
    }, [user]);

    return (
        <div style={{ padding: "20px" }}>
            <h1>Firestore Text Storage</h1>

            {user && (
                <div>
                    <p>Welcome, <strong>{user.email}</strong>!</p>
                    <button onClick={handleLogout} style={{ marginBottom: "20px" }}>
                        Log Out
                    </button>
                </div>
            )}

            <input
                type="text"
                placeholder="Enter text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                style={{ display: "block", marginBottom: "10px" }}
            />
            <button onClick={addText} style={{ marginBottom: "10px" }}>
                Add Text
            </button>

            <h2>Your Texts:</h2>
            <ul>
                {texts.length > 0 ? (
                    texts.map((t, index) => (
                        <li key={index}>
                            {t.text} {t.userEmail && <em>(by {t.userEmail})</em>}
                        </li>
                    ))
                ) : (
                    <p>No texts added yet.</p>
                )}
            </ul>
        </div>
    );
}
