"use client";

import { CalendarDaysIcon, ClockIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import BottomNav from "../components/BottomNav";

export default function DashboardPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Header */}
      <header className="bg-indigo-600 text-white p-4 shadow-md">
        <h1 className="text-xl font-bold">Dashboard Pengawas</h1>
        <p className="text-sm text-indigo-200">Ringkasan kunjungan hari ini</p>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-4 pb-20">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg shadow-md flex items-center">
            <CalendarDaysIcon className="h-8 w-8 text-indigo-500 mr-3" />
            <div>
              <p className="text-gray-500 text-sm">Total Toko</p>
              <p className="text-lg font-bold">8</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md flex items-center">
            <CheckCircleIcon className="h-8 w-8 text-green-500 mr-3" />
            <div>
              <p className="text-gray-500 text-sm">Sudah Kunjungan</p>
              <p className="text-lg font-bold">5</p>
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-md flex items-center">
            <ClockIcon className="h-8 w-8 text-red-500 mr-3" />
            <div>
              <p className="text-gray-500 text-sm">Belum Kunjungan</p>
              <p className="text-lg font-bold">3</p>
            </div>
          </div>
        </div>

        {/* Jadwal Kunjungan Singkat */}
        <h2 className="text-lg font-semibold mt-6 mb-2">Jadwal Hari Ini</h2>
        <ul className="space-y-3">
          <li className="bg-white p-3 rounded-lg shadow-sm flex justify-between items-center">
            <span className="font-medium">Toko A - Marelan</span>
            <span className="text-sm text-green-600 font-semibold">Selesai</span>
          </li>
          <li className="bg-white p-3 rounded-lg shadow-sm flex justify-between items-center">
            <span className="font-medium">Toko B - Deli Tua</span>
            <span className="text-sm text-yellow-600 font-semibold">Dalam Proses</span>
          </li>
          <li className="bg-white p-3 rounded-lg shadow-sm flex justify-between items-center">
            <span className="font-medium">Toko C - HM Joni</span>
            <span className="text-sm text-red-600 font-semibold">Belum</span>
          </li>
        </ul>
      </main>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}
