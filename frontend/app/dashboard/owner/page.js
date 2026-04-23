import TopNav from "../../components/TopNav";
import { fetchProperties, fetchPayments, fetchMaintenanceRequests } from "../../lib/api";

export default async function OwnerDashboard() {
  let properties = [];
  let payments = [];
  let maintenanceRequests = [];

  try {
    [properties, payments, maintenanceRequests] = await Promise.all([
      fetchProperties(),
      fetchPayments(),
      fetchMaintenanceRequests(),
    ]);
  } catch (e) {
    console.error("Could not load owner dashboard data:", e.message);
  }

  return (
    <>
      <TopNav />
      <main className="page wrapper">
        <h1>Owner Dashboard</h1>
        <p className="muted">Manage properties, rent collections, and tenant issues.</p>

        <div className="section-title">
          <h2>Your Properties</h2>
        </div>
        <section className="grid grid-3">
          {properties.length === 0 && (
            <p className="muted">No properties found. Make sure the backend is running.</p>
          )}
          {properties.map((item) => (
            <article key={item.id} className="card">
              <h3>{item.title}</h3>
              <p className="muted">{item.city}</p>
              <p className="kpi">INR {item.rent.toLocaleString("en-IN")}</p>
              <p className="muted">Availability: {item.availableFrom}</p>
            </article>
          ))}
        </section>

        <div className="section-title">
          <h2>Rent Status</h2>
        </div>
        <section className="card">
          {payments.length === 0 ? (
            <p className="muted">No payment records. Make sure the backend is running.</p>
          ) : (
            <table className="table">
              <thead>
                <tr>
                  <th>Tenant</th>
                  <th>Property</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((item) => (
                  <tr key={item.id}>
                    <td>{item.tenant}</td>
                    <td>{item.property}</td>
                    <td>INR {item.amount.toLocaleString("en-IN")}</td>
                    <td>{item.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>

        <div className="section-title">
          <h2>Open Maintenance</h2>
        </div>
        <section className="card">
          {maintenanceRequests.length === 0 && (
            <p className="muted">No maintenance requests. Make sure the backend is running.</p>
          )}
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
