"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
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
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Login failed");
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
          Welcome back, saathi
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
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
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
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
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-sm text-stone-500 dark:text-stone-400 mt-6">
          New here?{" "}
          <a href="/signup" className="text-orange-600 dark:text-orange-400 font-medium">
            Create an account
          </a>
        </p>
      </div>
    </main>
  );
}
