"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Header() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => setUser(data.user))
      .catch(() => setUser(null));
  }, []);

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
    router.refresh();
  }

  if (!user) {
    return null;
  }

  return (
    <div className="fixed top-4 left-4 z-50 flex items-center gap-2">
      <div className="flex items-center gap-2 bg-white/90 dark:bg-stone-800/90 backdrop-blur shadow-lg border border-stone-200 dark:border-stone-700 rounded-full pl-4 pr-1.5 py-1.5">
        <span className="text-sm font-medium text-stone-800 dark:text-stone-100">
          {user.name}
        </span>

        {user.role !== "member" && (
          <span className="text-xs bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-400 px-2 py-0.5 rounded-full capitalize">
            {user.role}
          </span>
        )}

        {user.role === "superadmin" && (
          <a
            href="/admin/users"
            className="text-xs text-orange-600 dark:text-orange-400 font-medium px-2"
          >
            Manage Admins
          </a>
        )}

        <button
          onClick={handleLogout}
          className="text-xs bg-stone-100 dark:bg-stone-700 hover:bg-stone-200 dark:hover:bg-stone-600 text-stone-700 dark:text-stone-200 px-3 py-1.5 rounded-full transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
