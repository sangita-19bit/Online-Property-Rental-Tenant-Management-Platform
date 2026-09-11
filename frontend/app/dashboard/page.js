"use client";

import { useEffect, useState } from "react";
import TopNav from "../components/TopNav";
import StatCard from "../components/StatCard";
import { fetchStats, fetchPayments, fetchMaintenanceRequests } from "../lib/api";

export default function Dashboard() {
  const [stats, setStats] = useState({ properties: 0, pendingMaintenance: 0, monthlyRevenue: 0 });
  const [payments, setPayments] = useState([]);
  const [maintenanceRequests, setMaintenanceRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingError, setLoadingError] = useState(null);
  const [slowNotice, setSlowNotice] = useState(false);

  async function loadData() {
    const token = typeof window !== "undefined" ? (localStorage.getItem("token") || document.cookie.match(/(?:^|;\s*)token=([^;]+)/)?.[1]) : null;
    if (!token) {
      window.location.href = "/auth/login?callbackUrl=/dashboard";
      return;
    }

    setLoading(true);
    setLoadingError(null);
    setSlowNotice(false);

    const slowTimer = setTimeout(() => {
      setSlowNotice(true);
    }, 3000);

    try {
      const [s, p, m] = await Promise.all([
        fetchStats().catch((err) => {
          console.warn("Stats error:", err.message);
          return { properties: 0, pendingMaintenance: 0, monthlyRevenue: 0 };
        }),
        fetchPayments().catch((err) => {
          throw new Error("Failed to load payments (" + err.message + ")");
        }),
        fetchMaintenanceRequests().catch((err) => {
          throw new Error("Failed to load maintenance (" + err.message + ")");
        }),
      ]);

      clearTimeout(slowTimer);
      setStats(s);
      setPayments(p);
      setMaintenanceRequests(m);
    } catch (e) {
      clearTimeout(slowTimer);
      setLoadingError(e.message);
      console.error("Could not load dashboard data:", e.message);
    } finally {
      clearTimeout(slowTimer);
      setLoading(false);
      setSlowNotice(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  if (loading) {
    return (
      <>
        <TopNav />
        <main className="page wrapper">
          <div style={{ textAlign: "center", padding: "3rem 1rem" }}>
            <p style={{ fontSize: "1.2rem", fontWeight: "600" }}>Loading dashboard data...</p>
            {slowNotice && (
              <p className="muted" style={{ maxWidth: "480px", margin: "1rem auto 0" }}>
                ⏳ Connecting to Render server. If the backend is waking up from sleep, this may take up to a minute...
              </p>
            )}
          </div>
        </main>
      </>
    );
  }

  return (
    <>
      <TopNav />
      <main className="page wrapper">
        <h1>My Dashboard</h1>
        <p className="muted">Platform overview, recent transactions, and maintenance requests.</p>

        {loadingError && (
          <div
            style={{
              color: "#991b1b",
              background: "#fee2e2",
              border: "1px solid #f87171",
              borderRadius: "8px",
              padding: "1rem",
              marginTop: "1rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "0.5rem",
            }}
          >
            <div>
              <strong>Error loading data:</strong> {loadingError}
            </div>
            <button onClick={loadData} className="btn btn-primary" style={{ padding: "0.4rem 0.8rem", fontSize: "0.85rem" }}>
              Retry
            </button>
          </div>
        )}

        <section className="grid grid-3" style={{ marginTop: "1rem" }}>
          <StatCard label="Properties" value={stats.properties} hint="All submitted listings" />
          <StatCard label="Pending Maintenance" value={stats.pendingMaintenance} hint="Needs action" />
          <StatCard label="Monthly Revenue" value={`INR ${Number(stats.monthlyRevenue).toLocaleString("en-IN")}`} />
        </section>

        <div className="section-title">
          <h2>Recent Payments</h2>
        </div>
        <section className="grid grid-2">
          {payments.length === 0 ? (
            <p className="muted card">No payment records available.</p>
          ) : (
            payments.map((p) => (
              <div key={p.id} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ fontSize: '1.1rem', marginBottom: '0.2rem' }}>{p.tenant}</h3>
                  <p className="muted" style={{ fontSize: '0.9rem', margin: 0 }}>ID: {p.id}</p>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <p style={{ fontWeight: 'bold', margin: '0 0 0.3rem 0' }}>INR {p.amount.toLocaleString("en-IN")}</p>
                  <span className={`badge ${p.status === 'Paid' ? 'badge-success' : p.status === 'Pending' ? 'badge-warning' : 'badge-info'}`}>
                    {p.status}
                  </span>
                </div>
              </div>
            ))
          )}
        </section>

        <div className="section-title">
          <h2>Maintenance Overview</h2>
        </div>
        <section className="grid grid-2">
          {maintenanceRequests.length === 0 ? (
            <p className="muted card">No maintenance requests available.</p>
          ) : (
            maintenanceRequests.map((m) => (
              <div key={m.id} className="card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ fontSize: '1.1rem', marginBottom: '0.2rem' }}>{m.issue}</h3>
                  <p className="muted" style={{ fontSize: '0.9rem', margin: 0 }}>Ticket: {m.id} • {m.priority} Priority</p>
                </div>
                <div>
                  <span className={`badge ${m.status === 'Completed' ? 'badge-success' : 'badge-warning'}`}>
                    {m.status}
                  </span>
                </div>
              </div>
            ))
          )}
        </section>
      </main>
    </>
  );
}
