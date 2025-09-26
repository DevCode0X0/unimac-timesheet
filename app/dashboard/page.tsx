"use client";

import Image from "next/image";
import BottomNav from "../components/BottomNav";

export default function DashboardPage() {
  return (
    <div className="pb-20 bg-gray-50 min-h-screen text-purple-600">
       {/* Judul di luar card */}
        <h1 className="text-2xl font-bold mb-4">Unimac Timesheet</h1>
      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 rounded-2xl text-white shadow-lg">
       

        {/* Card saldo */}
        <div className="text-white-800 p-4 flex justify-between items-center">
          <div>
            <p className="text-sm">Total Saldo</p>
            <h2 className="text-3xl font-bold">Rp 39.287</h2>
          </div>
          <div className="bg-purple-100 px-4 py-2 rounded-xl text-sm font-medium text-purple-600">
            810 Points
          </div>
        </div>
      </div>

      {/* Menu Grid */}
      <div className="p-4">
        <h3 className="font-semibold text-gray-700 mb-3">Favorit</h3>
        <div className="grid grid-cols-4 gap-4">
          {[
            { label: "Check-in", icon: "📸" },
            { label: "Jadwal", icon: "📅" },
            { label: "Timesheet", icon: "📝" },
            { label: "Laporan", icon: "📊" },
            { label: "Absensi", icon: "⏱" },
            { label: "Toko", icon: "🏬" },
            { label: "GPS", icon: "📍" },
            { label: "Pengawas", icon: "👤" },
          ].map((item, i) => (
            <div
              key={i}
              className="flex flex-col items-center bg-white p-3 rounded-xl shadow-sm"
            >
              <div className="w-12 h-12 flex items-center justify-center bg-indigo-100 text-2xl rounded-full">
                {item.icon}
              </div>
              <span className="text-xs mt-2 text-gray-700 text-center">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Banner Promo */}
      <div className="p-4">
        <div className="rounded-xl overflow-hidden shadow-md">
          <Image
            src="/banner-demo.jpg"
            alt="Promo"
            width={400}
            height={200}
            className="w-full h-auto"
          />
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}
