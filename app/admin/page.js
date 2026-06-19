"use client";

import { useEffect, useState } from "react";

export default function AdminPage() {
  const [fruitName, setFruitName] = useState("");
  const [pricePerKg, setPricePerKg] = useState("");
  const [targetKg, setTargetKg] = useState("");
  const [loading, setLoading] = useState(false);
  const [campaigns, setCampaigns] = useState([]);

  async function loadCampaigns() {
    const res = await fetch("/api/campaigns", { cache: "no-store" });
    const data = await res.json();
    setCampaigns(data);
  }

  useEffect(() => {
    loadCampaigns();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    await fetch("/api/campaigns", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fruitName,
        pricePerKg: Number(pricePerKg),
        targetKg: Number(targetKg),
      }),
    });

    setFruitName("");
    setPricePerKg("");
    setTargetKg("");
    setLoading(false);

    loadCampaigns();
  }

  async function handleDelete(id, name) {
    const confirmed = window.confirm(
      `Delete "${name}" campaign? This will also remove all its orders.`
    );
    if (!confirmed) return;

    await fetch(`/api/campaigns/${id}`, { method: "DELETE" });
    loadCampaigns();
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 dark:from-stone-950 dark:via-stone-900 dark:to-stone-950 p-6">
      <div className="max-w-2xl mx-auto">
        <a href="/" className="text-orange-600 dark:text-orange-400 text-sm font-medium">
          ← Back to campaigns
        </a>

        <div className="bg-white dark:bg-stone-900 p-6 rounded-2xl shadow-lg mt-4 border border-amber-100 dark:border-stone-800">
          <h1 className="text-3xl font-bold mb-6 text-stone-900 dark:text-white">
            🛒 Mandi Mart Admin
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              placeholder="Fruit Name"
              value={fruitName}
              onChange={(e) => setFruitName(e.target.value)}
              className="w-full border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
            <input
              type="number"
              placeholder="Price Per Kg"
              value={pricePerKg}
              onChange={(e) => setPricePerKg(e.target.value)}
              className="w-full border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
            <input
              type="number"
              placeholder="Target Kg"
              value={targetKg}
              onChange={(e) => setTargetKg(e.target.value)}
              className="w-full border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-white p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
              required
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-amber-600 to-rose-600 hover:opacity-90 text-white p-3 rounded-lg font-semibold disabled:opacity-50"
            >
              {loading ? "Creating..." : "Create Campaign"}
            </button>
          </form>
        </div>

        <div className="bg-white dark:bg-stone-900 p-6 rounded-2xl shadow-lg mt-6 border border-amber-100 dark:border-stone-800">
          <h2 className="text-xl font-bold mb-4 text-stone-900 dark:text-white">Manage Campaigns</h2>

          {campaigns.length === 0 ? (
            <p className="text-stone-500 dark:text-stone-400">No campaigns yet.</p>
          ) : (
            <div className="space-y-3">
              {campaigns.map((c) => (
                <div
                  key={c._id}
                  className="flex justify-between items-center border border-amber-100 dark:border-stone-800 rounded-lg p-4"
                >
                  <div>
                    <p className="font-semibold text-stone-900 dark:text-white">
                      🥭 {c.fruitName}
                    </p>
                    <p className="text-sm text-stone-500 dark:text-stone-400">
                      {c.currentKg}kg / {c.targetKg}kg · ₹{c.pricePerKg}/kg
                    </p>
                  </div>
                  <button
                    onClick={() => handleDelete(c._id, c.fruitName)}
                    className="text-sm font-medium text-red-600 dark:text-red-400 hover:text-white hover:bg-red-600 border border-red-200 dark:border-red-900 px-3 py-1.5 rounded-lg transition-colors"
                  >
                    🗑️ Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}