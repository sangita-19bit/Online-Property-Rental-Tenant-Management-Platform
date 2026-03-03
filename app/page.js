import Link from "next/link";
import StatCard from "./components/StatCard";
import TopNav from "./components/TopNav";
import { roleQuickLinks, stats } from "./lib/mockData";

export default function Home() {
  return (
    <>
      <TopNav />
      <main className="page wrapper">
        <section className="hero">
          <h1>Online Property Rental & Tenant Management</h1>
          <p>
            Manage listings, tenants, rent tracking, and maintenance requests in one
            web platform built with Next.js and Spring Boot.
          </p>
          <div className="cta-row">
            <Link href="/properties" className="btn btn-primary">
              Browse Properties
            </Link>
            <Link href="/dashboard/admin" className="btn btn-secondary">
              Open Admin Dashboard
            </Link>
          </div>
        </section>

        <div className="section-title">
          <h2>Platform Snapshot</h2>
        </div>
        <section className="grid grid-3">
          <StatCard label="Total Properties" value={stats.properties} hint="Across all owners" />
          <StatCard label="Occupied Units" value={stats.occupied} hint="Current active leases" />
          <StatCard
            label="Monthly Revenue"
            value={`INR ${stats.monthlyRevenue.toLocaleString("en-IN")}`}
            hint="Collected + pending"
          />
        </section>

        <div className="section-title">
          <h2>Role Dashboards</h2>
        </div>
        <section className="grid grid-3">
          {roleQuickLinks.map((item) => (
            <article key={item.role} className="card">
              <h3>{item.role}</h3>
              <p className="muted">Open actions and reports for {item.role.toLowerCase()} users.</p>
              <div className="cta-row">
                <Link href={item.href} className="nav-pill">
                  Open {item.role} Panel
                </Link>
              </div>
            </article>
          ))}
        </section>
      </main>
    </>
  );
}
