"use client";

import { HomeIcon, CalendarIcon, ClockIcon, UserIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { name: "Home", href: "/dashboard", icon: HomeIcon },
  { name: "Jadwal", href: "/schedule", icon: CalendarIcon },
  { name: "Timesheet", href: "/timesheet", icon: ClockIcon },
  { name: "Profil", href: "/profile", icon: UserIcon },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg">
      <div className="flex justify-around">
        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center py-2 px-3 text-xs ${
                active ? "text-indigo-600" : "text-gray-500"
              }`}
            >
              <item.icon className="h-6 w-6 mb-1" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
