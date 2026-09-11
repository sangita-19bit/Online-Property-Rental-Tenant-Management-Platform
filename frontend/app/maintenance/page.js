"use client";

import { useEffect, useState } from "react";
import TopNav from "../components/TopNav";
import { fetchMaintenanceRequests } from "../lib/api";

function priorityClass(priority) {
  if (priority === "High") return "badge badge-warning";
  if (priority === "Low") return "badge badge-info";
  return "badge badge-success";
}

export default function MaintenancePage() {
  const [maintenanceRequests, setMaintenanceRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [slowNotice, setSlowNotice] = useState(false);

  async function loadData() {
    setLoading(true);
    setError(null);
    setSlowNotice(false);

    const slowTimer = setTimeout(() => {
      setSlowNotice(true);
    }, 3000);

    try {
      const data = await fetchMaintenanceRequests();
      clearTimeout(slowTimer);
      setMaintenanceRequests(data);
    } catch (e) {
      clearTimeout(slowTimer);
      setError(e.message);
      console.error("Could not load maintenance requests:", e.message);
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
            <p style={{ fontSize: "1.2rem", fontWeight: "600" }}>Loading maintenance requests...</p>
            {slowNotice && (
              <p className="muted" style={{ maxWidth: "480px", margin: "1rem auto 0" }}>
                ⏳ Connecting to Render server. If the backend is waking up, this may take up to a minute...
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
        <h1>Maintenance Requests</h1>
        <p className="muted">Ticketing workflow for tenant complaints and owner updates.</p>

        {error && (
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
              <strong>Error loading maintenance requests:</strong> {error}
            </div>
            <button onClick={loadData} className="btn btn-primary" style={{ padding: "0.4rem 0.8rem", fontSize: "0.85rem" }}>
              Retry
            </button>
          </div>
        )}

        <section className="grid grid-2" style={{ marginTop: "1rem" }}>
          {maintenanceRequests.length === 0 && !error && (
            <p className="muted">No maintenance requests found. Make sure the backend is running.</p>
          )}
          {maintenanceRequests.map((item) => (
            <article key={item.id} className="card">
              <h3>{item.issue}</h3>
              <p className="muted">Ticket: {item.id}</p>
              <p className="muted">Tenant: {item.tenant}</p>
              <p className="muted">Property: {item.property}</p>
              <p>
                <span className={priorityClass(item.priority)}>{item.priority}</span>
                {" "}
                <span className="badge badge-info">{item.status}</span>
              </p>
            </article>
          ))}
        </section>
      </main>
    </>
  );
}
