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

  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchMaintenanceRequests();
        setMaintenanceRequests(data);
      } catch (e) {
        console.error("Could not load maintenance requests:", e.message);
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
          <p>Loading maintenance requests...</p>
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

        <section className="grid grid-2" style={{ marginTop: "1rem" }}>
          {maintenanceRequests.length === 0 && (
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
