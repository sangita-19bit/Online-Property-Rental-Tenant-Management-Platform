"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
    <header className="top-nav">
      <div className="wrapper nav-inner">
        <Link href="/" className="brand">
          RentFlow
        </Link>
        <nav className="nav-links" style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
          {baseLinks.map((item) => (
            <Link key={item.href} href={item.href} className="nav-pill">
              {item.label}
            </Link>
          ))}

          {user ? (
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span style={{ fontSize: "0.85rem", color: "var(--brand)", fontWeight: "600" }}>
                👤 {user}
              </span>
              <button
                onClick={handleSignOut}
                className="nav-pill"
                style={{
                  cursor: "pointer",
                  color: "#d32f2f",
                  border: "1px solid #ffcdcd",
                  background: "#fff",
                }}
              >
                Sign Out
              </button>
            </div>
          ) : (
            <Link href="/auth/login" className="nav-pill" style={{ fontWeight: "600" }}>
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
