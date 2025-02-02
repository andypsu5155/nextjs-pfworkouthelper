"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { app } from "@/lib//firebaseConfig"; // Your Firebase config file

export default function AuthPage() {
  const router = useRouter();
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Sign in with Google
  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, provider);
      router.push("/"); // Redirect after login
    } catch (error) {
      console.error("Google Login failed:", error);
      setError("Failed to sign in with Google.");
    }
  };

  // Sign up with Email & Password
  const signUpWithEmail = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      router.push("/"); // Redirect after sign up
    } catch (error) {
      console.error("Sign Up failed:", error);
      setError(
        "Failed to create account. Password must be at least 6 characters."
      );
    }
  };

  // Sign in with Email & Password
  const signInWithEmail = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/"); // Redirect after login
    } catch (error) {
      console.error("Sign In failed:", error);
      setError("Invalid email or password.");
    }
  };

  // Redirect if user is already logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        router.push("/"); // Redirect logged-in users
      }
    });
    return () => unsubscribe();
  }, [auth, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-4">
      <h1 className="text-xl font-bold">Sign in to PFWorkout</h1>

      {/* Google Sign-In */}
      <button
        onClick={signInWithGoogle}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Sign in with Google
      </button>

      {/* Email & Password Form */}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 rounded w-64"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 rounded w-64"
      />

      {/* Buttons for Email Sign-Up & Sign-In */}
      <div className="flex space-x-2">
        <button
          onClick={signUpWithEmail}
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          Sign Up
        </button>
        <button
          onClick={signInWithEmail}
          className="px-4 py-2 bg-gray-500 text-white rounded"
        >
          Sign In
        </button>
      </div>

      {/* Error Message */}
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
