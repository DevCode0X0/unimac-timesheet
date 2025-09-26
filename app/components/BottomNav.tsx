"use client";

import { HomeIcon, CalendarIcon, UserIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg flex justify-around py-2">
      <Link href="/dashboard" className="flex flex-col items-center text-gray-600 hover:text-indigo-600">
        <HomeIcon className="h-6 w-6" />
        <span className="text-xs">Home</span>
      </Link>
      <Link href="/dashboard/jadwal" className="flex flex-col items-center text-gray-600 hover:text-indigo-600">
        <CalendarIcon className="h-6 w-6" />
        <span className="text-xs">Jadwal</span>
      </Link>
      <Link href="/dashboard/profil" className="flex flex-col items-center text-gray-600 hover:text-indigo-600">
        <UserIcon className="h-6 w-6" />
        <span className="text-xs">Profil</span>
      </Link>
    </nav>
  );
}
