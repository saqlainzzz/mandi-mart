"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function DeleteCampaignButton({
  campaignId,
  fruitName,
  redirectTo,
}) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleDelete(e) {
    e.preventDefault();
    e.stopPropagation();

    const confirmed = window.confirm(
      `Delete "${fruitName}" campaign? This will also remove all its orders. This cannot be undone.`
    );

    if (!confirmed) return;

    setLoading(true);

    try {
      const res = await fetch(`/api/campaigns/${campaignId}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        alert(data.error || "Failed to delete campaign");
        setLoading(false);
        return;
      }

      if (redirectTo) {
        router.push(redirectTo);
      }
      router.refresh();
    } catch (err) {
      alert("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="inline-flex items-center gap-1.5 text-sm font-medium text-red-600 dark:text-red-400 hover:text-white hover:bg-red-600 border border-red-200 dark:border-red-900 px-3 py-1.5 rounded-lg transition-colors disabled:opacity-50"
    >
      {loading ? "Deleting..." : "🗑️ Delete"}
    </button>
  );
}