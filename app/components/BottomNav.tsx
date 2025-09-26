"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  HomeIcon,
  CalendarDaysIcon,
  CameraIcon,
  BellIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

export default function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { name: "Home", href: "/dashboard", icon: HomeIcon },
    { name: "Jadwal", href: "/jadwal", icon: CalendarDaysIcon },
    { name: "Foto", href: "/foto", icon: CameraIcon, isCenter: true },
    { name: "Notif", href: "/notif", icon: BellIcon },
    { name: "Profil", href: "/profil", icon: UserIcon },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 shadow-lg flex justify-around items-center h-16 z-50">
      {navItems.map((item, idx) => {
        const isActive = pathname === item.href;

        if (item.isCenter) {
          return (
            <div
              key={idx}
              className="relative -top-7 flex items-center justify-center"
            >
              <Link href={item.href}>
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <div className="w-14 h-14 bg-indigo-600 rounded-full flex items-center justify-center text-white">
                    <item.icon className="w-7 h-7" />
                  </div>
                </div>
              </Link>
            </div>
          );
        }

        return (
          <Link
            key={idx}
            href={item.href}
            className={`flex flex-col items-center justify-center text-gray-500 ${
              isActive ? "text-indigo-600" : ""
            }`}
          >
            <item.icon className="w-6 h-6" />
            <span className="text-xs">{item.name}</span>
          </Link>
        );
      })}
    </nav>
  );
}
