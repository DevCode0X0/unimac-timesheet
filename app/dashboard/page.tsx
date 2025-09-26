"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import BottomNav from "../components/BottomNav";

interface Reminder {
  id: string; // Supabase pakai UUID
  title: string;
  image_url: string;
}

export default function DashboardPage() {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Fetch reminders dari API Backend
  useEffect(() => {
    const fetchReminders = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/reminder/list`
        );
        if (!res.ok) throw new Error("Gagal fetch reminder");
        const data: Reminder[] = await res.json();
        setReminders(data);
      } catch (err) {
        console.error("Error fetch reminders:", err);
      }
    };
    fetchReminders();
  }, []);

  // Slideshow otomatis
  useEffect(() => {
    if (reminders.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % reminders.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [reminders]);

  return (
    <div className="pb-20 bg-gray-50 min-h-screen text-purple-600">
      {/* Judul */}
      <h1 className="text-2xl font-bold mb-4">Unimac Timesheet</h1>

      {/* Header saldo */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 rounded-2xl text-white shadow-lg">
        <div className="p-2 flex justify-between items-center">
          <div>
            <p className="text-sm">Total Saldo</p>
            <h2 className="text-3xl font-bold">Rp 39.287</h2>
          </div>
          <div className="bg-purple-100 px-4 py-2 rounded-xl text-sm font-semibold text-purple-600">
            810 Points
          </div>
        </div>
      </div>

      {/* Menu Grid */}
      <div className="p-2">
        <div className="grid grid-cols-3 gap-4 bg-white p-3 rounded-2xl shadow-md">
          {[
            { label: "Absensi", icon: "⏱" },
            { label: "Timesheet", icon: "📝" },
            { label: "Laporan", icon: "📊" },
            { label: "Toko", icon: "🏬" },
            { label: "GPS", icon: "📍" },
            { label: "Pengawas", icon: "👤" },
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center p-3">
              <div className="w-12 h-12 flex items-center justify-center bg-indigo-100 text-2xl rounded-full">
                {item.icon}
              </div>
              <span className="text-sm mt-2 font-semibold text-gray-700 text-center">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Reminder Slideshow */}
      <div className="p-4">
        <div className="rounded-xl overflow-hidden shadow-md h-48 flex items-center justify-center bg-gray-100 relative">
          {reminders.length > 0 ? (
            <Image
              src={reminders[currentIndex].image_url}
              alt={reminders[currentIndex].title}
              fill
              className="object-cover"
            />
          ) : (
            <p className="text-gray-500">Belum ada reminder</p>
          )}
        </div>

        {/* Dot indikator */}
        <div className="flex justify-center mt-2 space-x-2">
          {reminders.map((_, idx) => (
            <span
              key={idx}
              className={`h-2 w-2 rounded-full ${
                idx === currentIndex ? "bg-purple-600" : "bg-gray-300"
              }`}
            ></span>
          ))}
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}
