"use client";

import Link from "next/link";

const publicLinks = [
  { label: "Home", href: "/" },
  { label: "Dashboard", href: "/dashboard" },
  { label: "Properties", href: "/properties" },
  { label: "Payments", href: "/payments" },
  { label: "Maintenance", href: "/maintenance" },
  { label: "Login", href: "/auth/login" },
];

export default function TopNav() {
  return (
    <header className="top-nav">
      <div className="wrapper nav-inner">
        <Link href="/" className="brand">
          RentFlow
        </Link>
        <nav className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          {publicLinks.map((item) => (
            <Link key={item.href} href={item.href} className="nav-pill">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
