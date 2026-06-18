"use client";

import { useState } from "react";

export default function OrderForm({
  campaignId,
}) {
  const [name, setName] =
    useState("");

  const [
    quantityKg,
    setQuantityKg,
  ] = useState("");

  const [loading, setLoading] =
    useState(false);

  const [message, setMessage] =
    useState("");

  const [error, setError] =
    useState("");

  async function submitOrder(e) {
    e.preventDefault();

    setLoading(true);
    setMessage("");
    setError("");

    try {
      const res = await fetch(
        "/api/orders",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            campaignId,
            name,
            quantityKg,
          }),
        }
      );

      const data =
        await res.json();

      if (!res.ok) {
        setError(
          data.error ||
            "Unable to place order"
        );
        setLoading(false);
        return;
      }

      setMessage(
        `✅ Order placed successfully for ${quantityKg}kg`
      );

      setName("");
      setQuantityKg("");

      setTimeout(() => {
        window.location.reload();
      }, 1200);
    } catch (err) {
      setError(
        "Something went wrong. Please try again."
      );
    }

    setLoading(false);
  }

  return (
    <div className="bg-gray-50 border rounded-xl p-6">

      <form
        onSubmit={submitOrder}
        className="space-y-4"
      >

        <div>
          <label className="block text-sm font-medium mb-2">
            Your Name
          </label>

          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) =>
              setName(
                e.target.value
              )
            }
            className="w-full border rounded-lg p-3"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Quantity (kg)
          </label>

          <input
            type="number"
            min="1"
            placeholder="Enter quantity"
            value={quantityKg}
            onChange={(e) =>
              setQuantityKg(
                e.target.value
              )
            }
            className="w-full border rounded-lg p-3"
            required
          />
        </div>

        {message && (
          <div className="bg-green-100 border border-green-300 text-green-700 p-3 rounded-lg">
            {message}
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-300 text-red-700 p-3 rounded-lg">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold disabled:opacity-50"
        >
          {loading
            ? "Placing Order..."
            : "Place Order"}
        </button>

      </form>

      <div className="mt-4 text-sm text-gray-500">
        Orders are visible to the entire community for transparency.
      </div>

    </div>
  );
}