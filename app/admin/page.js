"use client";

import { useState } from "react";

export default function AdminPage() {
  const [fruitName, setFruitName] = useState("");
  const [pricePerKg, setPricePerKg] = useState("");
  const [targetKg, setTargetKg] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);

    const res = await fetch("/api/campaigns", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fruitName,
        pricePerKg: Number(pricePerKg),
        targetKg: Number(targetKg),
      }),
    });

    const data = await res.json();

    alert("Campaign Created");

    setFruitName("");
    setPricePerKg("");
    setTargetKg("");

    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow">

        <h1 className="text-3xl font-bold mb-6">
          Mandi Mart Admin
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          <input
            type="text"
            placeholder="Fruit Name"
            value={fruitName}
            onChange={(e) =>
              setFruitName(e.target.value)
            }
            className="w-full border p-3 rounded"
            required
          />

          <input
            type="number"
            placeholder="Price Per Kg"
            value={pricePerKg}
            onChange={(e) =>
              setPricePerKg(e.target.value)
            }
            className="w-full border p-3 rounded"
            required
          />

          <input
            type="number"
            placeholder="Target Kg"
            value={targetKg}
            onChange={(e) =>
              setTargetKg(e.target.value)
            }
            className="w-full border p-3 rounded"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white p-3 rounded"
          >
            {loading
              ? "Creating..."
              : "Create Campaign"}
          </button>

        </form>
      </div>
    </main>
  );
}