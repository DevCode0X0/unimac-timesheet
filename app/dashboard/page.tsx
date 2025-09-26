// /app/dashboard/page.tsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import BottomNav from "../components/BottomNav";

interface Reminder {
  id: string;       // Supabase pakai UUID
  title: string;    // nama file (opsional, bisa dihapus kalau nggak dipakai lagi)
  image_url: string;
  note: string;     // 🆕 catatan reminder
  created_at?: string; // optional, kalau mau pakai untuk urutan
}


export default function DashboardPage() {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [startX, setStartX] = useState<number | null>(null);
  const [translateX, setTranslateX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

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

  // Auto slideshow
  useEffect(() => {
    if (reminders.length > 0 && !isDragging) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % reminders.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [reminders, isDragging]);

  // Gesture handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setStartX(e.touches[0].clientX);
    setIsDragging(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (startX === null) return;
    const deltaX = e.touches[0].clientX - startX;
    setTranslateX(deltaX);
  };

  const handleTouchEnd = () => {
    if (translateX > 50) {
      // swipe kanan
      setCurrentIndex((prev) => (prev - 1 + reminders.length) % reminders.length);
    } else if (translateX < -50) {
      // swipe kiri
      setCurrentIndex((prev) => (prev + 1) % reminders.length);
    }
    setTranslateX(0);
    setStartX(null);
    setIsDragging(false);
  };

  return (
    <div className="pb-20 bg-gray-50 min-h-screen text-purple-600">
      {/* Judul */}
      <h1 className="text-2xl font-bold mb-4">Unimac Timesheet</h1>

      {/* Ringkasan Hari Ini */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 rounded-2xl text-white shadow-lg">
        <div className="flex justify-between items-center mb-2">
          <div>
            <p className="text-sm">Target Jam Kerja Hari Ini</p>
            <h2 className="text-3xl font-bold">8 Jam</h2>
          </div>
          <div className="bg-purple-100 px-4 py-2 rounded-xl text-sm font-semibold text-purple-600">
           <p>1/8 Toko</p>
           <p>2:30/8 Jam</p>
          </div>
        </div>

        <div className="flex justify-between text-sm text-purple-100">
          <p>Check-in Terakhir: <span className="font-semibold">08:15</span></p>
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
        <div
          className="relative overflow-hidden rounded-xl shadow-md h-48 bg-gray-100"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div
            className="flex h-full transition-transform duration-500 ease-out"
            style={{
              transform: `translateX(calc(${-currentIndex * 100}% + ${translateX}px))`,
            }}
          >
            {reminders.map((item) => (
              <div key={item.id} className="w-full flex-shrink-0 relative">
                <Image
                  src={item.image_url}
                  alt={item.title}
                  fill
                  className="object-cover"
                />                
                <div className="absolute bottom-0 w-full bg-black bg-opacity-40 text-white p-2 text-sm">
                {reminders[currentIndex].note || "Tanpa catatan"}
                </div>

              </div>
            ))}
          </div>
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
