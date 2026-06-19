"use client";

import { useEffect, useState } from "react";

export default function OrderForm({ campaignId }) {
  const [userName, setUserName] = useState("");
  const [quantityKg, setQuantityKg] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => setUserName(data.user?.name || ""));
  }, []);

  async function submitOrder(e) {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ campaignId, quantityKg }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Unable to place order");
        setLoading(false);
        return;
      }

      setMessage(`✅ Order placed successfully for ${quantityKg}kg`);
      setQuantityKg("");

      setTimeout(() => {
        window.location.reload();
      }, 1200);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }

    setLoading(false);
  }

  return (
    <div className="bg-amber-50 dark:bg-stone-800/50 border border-amber-100 dark:border-stone-800 rounded-xl p-6">
      <form onSubmit={submitOrder} className="space-y-4">
        {userName && (
          <p className="text-sm text-stone-600 dark:text-stone-400">
            Ordering as <span className="font-semibold text-stone-900 dark:text-white">{userName}</span>
          </p>
        )}

        <div>
          <label className="block text-sm font-medium mb-2 text-stone-700 dark:text-stone-300">
            Quantity (kg)
          </label>
          <input
            type="number"
            min="1"
            placeholder="Enter quantity"
            value={quantityKg}
            onChange={(e) => setQuantityKg(e.target.value)}
            className="w-full border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
          />
        </div>

        {message && (
          <div className="bg-emerald-100 dark:bg-emerald-900/30 border border-emerald-300 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 p-3 rounded-lg">
            {message}
          </div>
        )}

        {error && (
          <div className="bg-red-100 dark:bg-red-900/30 border border-red-300 dark:border-red-800 text-red-700 dark:text-red-400 p-3 rounded-lg">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-amber-600 to-rose-600 hover:opacity-90 text-white py-3 rounded-lg font-semibold disabled:opacity-50 transition-opacity"
        >
          {loading ? "Placing Order..." : "Place Order"}
        </button>
      </form>

      <div className="mt-4 text-sm text-stone-500 dark:text-stone-400">
        Orders are visible to the entire community for transparency.
      </div>
    </div>
  );
}
