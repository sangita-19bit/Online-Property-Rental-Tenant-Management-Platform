"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { getStoredToken, clearAuthSession } from "../lib/api";

const baseLinks = [
  { label: "Home", href: "/" },
  { label: "Dashboard", href: "/dashboard" },
  { label: "Properties", href: "/properties" },
  { label: "Payments", href: "/payment" },
  { label: "Maintenance", href: "/maintenance" },
];

export default function TopNav() {
  const [user, setUser] = useState(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const token = getStoredToken();
    const storedUsername = localStorage.getItem("username");
    if (token) {
      setUser(storedUsername || "User");
    } else {
      setUser(null);
    }
  }, []);

  const handleSignOut = () => {
    clearAuthSession();
    setUser(null);
    router.push("/auth/login");
    router.refresh();
  };

  return (
    <header className="bg-white border-b border-teal-100 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="text-2xl font-black text-teal-800 tracking-tight flex items-center gap-2">
          <svg className="w-8 h-8 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
          RentFlow
        </Link>
        
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
          {baseLinks.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href));
            return (
              <Link 
                key={item.href} 
                href={item.href} 
                className={`px-3 lg:px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                  isActive 
                    ? "bg-teal-50 text-teal-800 shadow-sm ring-1 ring-teal-200/50" 
                    : "text-gray-600 hover:bg-gray-50 hover:text-teal-700"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-3">
              <span className="hidden sm:flex items-center text-sm font-bold text-teal-700 bg-teal-50 px-3 py-1.5 rounded-full ring-1 ring-teal-100">
                <svg className="w-4 h-4 mr-1.5 opacity-70" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd"></path></svg>
                {user}
              </span>
              <button
                onClick={handleSignOut}
                className="text-sm font-bold text-red-600 bg-red-50 hover:bg-red-100 px-4 py-2 rounded-xl transition-colors ring-1 ring-red-200"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <Link 
              href="/auth/login" 
              className="text-sm font-bold text-white bg-teal-700 hover:bg-teal-800 px-5 py-2 rounded-xl transition-colors shadow-sm active:scale-95"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
