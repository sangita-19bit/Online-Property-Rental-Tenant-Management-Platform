import TopNav from "../../components/TopNav";
import { maintenanceRequests, payments } from "../../lib/mockData";

export default function TenantDashboard() {
  return (
    <>
      <TopNav />
      <main className="page wrapper">
        <h1>Tenant Dashboard</h1>
        <p className="muted">Track your lease, payments, and maintenance tickets.</p>

        <div className="section-title">
          <h2>Payment History</h2>
        </div>
        <section className="card">
          <table className="table">
            <thead>
              <tr>
                <th>Payment ID</th>
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
                  <td>{item.property}</td>
                  <td>{item.dueDate}</td>
                  <td>INR {item.amount.toLocaleString("en-IN")}</td>
                  <td>{item.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <div className="section-title">
          <h2>Maintenance Requests</h2>
        </div>
        <section className="card">
          {maintenanceRequests.map((item) => (
            <p key={item.id}>
              <strong>{item.id}</strong> - {item.issue} ({item.status})
            </p>
          ))}
        </section>
      </main>
    </>
  );
}
