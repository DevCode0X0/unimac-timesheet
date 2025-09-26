"use client";

import BottomNav from "../components/BottomNav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Konten utama */}
      <main className="flex-1 p-4">{children}</main>

      {/* Navigasi bawah */}
      <BottomNav />
    </div>
  );
}
