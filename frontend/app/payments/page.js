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

  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchPayments();
        setPayments(data);
      } catch (e) {
        console.error("Could not load payments:", e.message);
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
          <p>Loading payments...</p>
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
