"use client";

import { useEffect, useState } from "react";

export default function ManageAdminsPage() {
  const [users, setUsers] = useState([]);
  const [me, setMe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => setMe(data.user));

    loadUsers();
  }, []);

  async function loadUsers() {
    setLoading(true);
    const res = await fetch("/api/admin/users");
    const data = await res.json();

    if (res.ok) {
      setUsers(data);
      setError("");
    } else {
      setError(data.error || "Unable to load users");
    }

    setLoading(false);
  }

  async function changeRole(userId, role) {
    const res = await fetch("/api/admin/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, role }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.error || "Unable to update role");
      return;
    }

    loadUsers();
  }

  if (me && me.role !== "superadmin") {
    return (
      <main className="min-h-screen bg-amber-50 dark:bg-stone-950 flex items-center justify-center p-6">
        <div className="bg-white dark:bg-stone-900 p-8 rounded-xl shadow-md text-center">
          <h1 className="text-2xl font-bold text-stone-900 dark:text-white">
            Only the super admin can manage admins
          </h1>
          <a href="/" className="text-orange-600 dark:text-orange-400 mt-4 inline-block">
            ← Back home
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50 dark:from-stone-950 dark:via-stone-900 dark:to-stone-950 p-6">
      <div className="max-w-2xl mx-auto">
        <a href="/" className="text-orange-600 dark:text-orange-400 text-sm font-medium">
          ← Back to campaigns
        </a>

        <div className="bg-white dark:bg-stone-900 p-6 rounded-2xl shadow-lg mt-4 border border-amber-100 dark:border-stone-800">
          <h1 className="text-2xl font-bold mb-1 text-stone-900 dark:text-white">
            Manage Admins
          </h1>
          <p className="text-stone-500 dark:text-stone-400 mb-6 text-sm">
            Only admins can delete campaigns. As super admin, you decide who gets that power.
          </p>

          {error && (
            <div className="bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400 p-3 rounded-lg mb-4 text-sm">
              {error}
            </div>
          )}

          {loading ? (
            <p className="text-stone-500 dark:text-stone-400">Loading...</p>
          ) : (
            <div className="space-y-3">
              {users.map((u) => (
                <div
                  key={u._id}
                  className="flex justify-between items-center border border-amber-100 dark:border-stone-800 rounded-lg p-4"
                >
                  <div>
                    <p className="font-semibold text-stone-900 dark:text-white">{u.name}</p>
                    <p className="text-sm text-stone-500 dark:text-stone-400">{u.email}</p>
                  </div>

                  {u.role === "superadmin" ? (
                    <span className="text-xs bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400 px-3 py-1.5 rounded-full">
                      Super Admin
                    </span>
                  ) : u.role === "admin" ? (
                    <button
                      onClick={() => changeRole(u._id, "member")}
                      className="text-sm font-medium text-stone-600 dark:text-stone-300 hover:text-white hover:bg-stone-600 border border-stone-300 dark:border-stone-700 px-3 py-1.5 rounded-lg transition-colors"
                    >
                      Remove Admin
                    </button>
                  ) : (
                    <button
                      onClick={() => changeRole(u._id, "admin")}
                      className="text-sm font-medium text-orange-600 dark:text-orange-400 hover:text-white hover:bg-orange-600 border border-orange-200 dark:border-orange-900 px-3 py-1.5 rounded-lg transition-colors"
                    >
                      Make Admin
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
