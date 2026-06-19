"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Signup failed");
        setLoading(false);
        return;
      }

      router.push("/");
      router.refresh();
    } catch (err) {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 dark:from-stone-950 dark:via-stone-900 dark:to-stone-950 flex items-center justify-center p-6">
      <div className="w-full max-w-sm bg-white dark:bg-stone-900 rounded-2xl shadow-lg p-8 border border-amber-100 dark:border-stone-800">
        <h1 className="text-3xl font-black text-stone-900 dark:text-white text-center">
          🛒 Mandi Mart
        </h1>
        <p className="text-center text-stone-500 dark:text-stone-400 mt-1 mb-6">
          Join the family, saathi
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
          />
          <input
            type="password"
            placeholder="Password (min 6 characters)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
            minLength={6}
          />

          {error && (
            <div className="bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-800 text-red-700 dark:text-red-400 p-3 rounded-lg text-sm">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-amber-600 to-rose-600 hover:opacity-90 text-white py-3 rounded-lg font-semibold disabled:opacity-50 transition-opacity"
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center text-sm text-stone-500 dark:text-stone-400 mt-6">
          Already have an account?{" "}
          <a href="/login" className="text-orange-600 dark:text-orange-400 font-medium">
            Login
          </a>
        </p>
      </div>
    </main>
  );
}
