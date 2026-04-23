import TopNav from "../../components/TopNav";
import StatCard from "../../components/StatCard";
import { fetchStats, fetchPayments, fetchMaintenanceRequests } from "../../lib/api";

export default async function AdminDashboard() {
  let stats = { properties: 0, pendingMaintenance: 0, monthlyRevenue: 0 };
  let payments = [];
  let maintenanceRequests = [];

  try {
    [stats, payments, maintenanceRequests] = await Promise.all([
      fetchStats(),
      fetchPayments(),
      fetchMaintenanceRequests(),
    ]);
  } catch (e) {
    console.error("Could not load admin dashboard data:", e.message);
  }

  return (
    <>
      <TopNav />
      <main className="page wrapper">
        <h1>Admin Dashboard</h1>
        <p className="muted">Platform control, approvals, transactions, and disputes.</p>

        <section className="grid grid-3" style={{ marginTop: "1rem" }}>
          <StatCard label="Properties" value={stats.properties} hint="All submitted listings" />
          <StatCard label="Pending Maintenance" value={stats.pendingMaintenance} hint="Needs owner action" />
          <StatCard label="Monthly Revenue" value={`INR ${Number(stats.monthlyRevenue).toLocaleString("en-IN")}`} />
        </section>

        <div className="section-title">
          <h2>Recent Payments</h2>
        </div>
        <section className="card">
          {payments.length === 0 ? (
            <p className="muted">No payment records. Make sure the backend is running.</p>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Tenant</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((p) => (
                  <tr key={p.id}>
                    <td>{p.id}</td>
                    <td>{p.tenant}</td>
                    <td>INR {p.amount.toLocaleString("en-IN")}</td>
                    <td>{p.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>

        <div className="section-title">
          <h2>Maintenance Overview</h2>
        </div>
        <section className="card">
          {maintenanceRequests.length === 0 ? (
            <p className="muted">No maintenance requests. Make sure the backend is running.</p>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>Ticket</th>
                  <th>Issue</th>
                  <th>Priority</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {maintenanceRequests.map((m) => (
                  <tr key={m.id}>
                    <td>{m.id}</td>
                    <td>{m.issue}</td>
                    <td>{m.priority}</td>
                    <td>{m.status}</td>
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
