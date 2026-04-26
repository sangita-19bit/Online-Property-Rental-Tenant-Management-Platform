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

  useEffect(() => {
    async function loadData() {
      const token = localStorage.getItem("token");
      if (!token) {
        window.location.href = "/auth/login";
        return;
      }

      try {
        const s = await fetchStats().catch((err) => {
          setLoadingError("Stats error: " + err.message);
          return { properties: 0, pendingMaintenance: 0, monthlyRevenue: 0 };
        });
        setStats(s);
        
        const p = await fetchPayments().catch((err) => {
          setLoadingError("Payments error: " + err.message);
          return [];
        });
        setPayments(p);
        
        const m = await fetchMaintenanceRequests().catch((err) => {
          setLoadingError("Maintenance error: " + err.message);
          return [];
        });
        setMaintenanceRequests(m);
      } catch (e) {
        setLoadingError(e.message);
        console.error("Could not load dashboard data:", e.message);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) {
    return (
      <>
        <TopNav />
        <main className="page wrapper">
          <p>Loading dashboard data...</p>
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
