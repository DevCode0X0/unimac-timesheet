"use client";

import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [user, setUser] = useState<{ username: string } | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          setUser(JSON.parse(storedUser));
        } catch (err) {
          console.error("Gagal parse user dari localStorage:", err);
        }
      }
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Dashboard</h1>
        {user ? (
          <p className="text-gray-600">
            Selamat datang,{" "}
            <span className="font-semibold">{user.username}</span> 🎉
          </p>
        ) : (
          <p className="text-gray-500">Memuat data user...</p>
        )}
      </div>
    </div>
  );
}
