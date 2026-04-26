import Link from "next/link";
import StatCard from "../components/StatCard";
import TopNav from "../components/TopNav";
import { fetchStats } from "../lib/api";

export default async function HomeDashboard() {
  let stats = { properties: 0, occupied: 0, monthlyRevenue: 0, pendingMaintenance: 0 };
  try {
    stats = await fetchStats();
  } catch (e) {
    console.error("Could not load stats:", e.message);
  }

  return (
    <>
      <TopNav />
      <main className="page wrapper">
        <section className="hero">
          <h1>Online Property Rental &amp; Tenant Management</h1>
          <p>
            Manage listings, tenants, rent tracking, and maintenance requests in one
            web platform built with Next.js and Spring Boot.
          </p>
          <div className="cta-row">
            <Link href="/properties" className="btn btn-primary">
              Browse Properties
            </Link>
            <Link href="/dashboard" className="btn btn-secondary">
              Go to My Dashboard
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
            value={`INR ${Number(stats.monthlyRevenue).toLocaleString("en-IN")}`}
            hint="Collected + pending"
          />
        </section>


      </main>
    </>
  );
}
