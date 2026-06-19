"use client";

import { useState } from "react";

export default function OrderForm({ campaignId }) {
  const [name, setName] = useState("");
  const [quantityKg, setQuantityKg] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function submitOrder(e) {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setError("");

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ campaignId, name, quantityKg }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Unable to place order");
        setLoading(false);
        return;
      }

      setMessage(`✅ Order placed successfully for ${quantityKg}kg`);
      setName("");
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
        <div>
          <label className="block text-sm font-medium mb-2 text-stone-700 dark:text-stone-300">
            Your Name
          </label>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-900 dark:text-white rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
            required
          />
        </div>

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