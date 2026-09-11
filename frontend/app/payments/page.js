"use client";

import { useEffect, useState } from "react";
import TopNav from "../components/TopNav";
import { fetchPayments } from "../lib/api";

function statusClass(status) {
  if (status === "Paid") return "badge badge-success";
  if (status === "Overdue") return "badge badge-warning";
  return "badge badge-info";
}

export default function PaymentsPage() {
  const [payments, setPayments] = useState([]);
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
      const data = await fetchPayments();
      clearTimeout(slowTimer);
      setPayments(data);
    } catch (e) {
      clearTimeout(slowTimer);
      setError(e.message);
      console.error("Could not load payments:", e.message);
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
            <p style={{ fontSize: "1.2rem", fontWeight: "600" }}>Loading payments...</p>
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
        <h1>Rent &amp; Payments</h1>
        <p className="muted">Track rent dues, status, and transaction records.</p>

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
              <strong>Error loading payments:</strong> {error}
            </div>
            <button onClick={loadData} className="btn btn-primary" style={{ padding: "0.4rem 0.8rem", fontSize: "0.85rem" }}>
              Retry
            </button>
          </div>
        )}

        <section className="card" style={{ marginTop: "1rem" }}>
          {payments.length === 0 ? (
            <p className="muted">No payment records found. Make sure the backend is running.</p>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>Payment ID</th>
                  <th>Tenant</th>
                  <th>Property</th>
                  <th>Due Date</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((item) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.tenant}</td>
                    <td>{item.property}</td>
                    <td>{item.dueDate}</td>
                    <td>INR {item.amount.toLocaleString("en-IN")}</td>
                    <td>
                      <span className={statusClass(item.status)}>{item.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      </main>
    </>
  );
}
