import TopNav from "../components/TopNav";
import { payments } from "../lib/mockData";

function statusClass(status) {
  if (status === "Paid") return "badge badge-success";
  if (status === "Overdue") return "badge badge-warning";
  return "badge badge-info";
}

export default function PaymentsPage() {
  return (
    <>
      <TopNav />
      <main className="page wrapper">
        <h1>Rent & Payments</h1>
        <p className="muted">Track rent dues, status, and transaction records.</p>
        <section className="card" style={{ marginTop: "1rem" }}>
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
        </section>
      </main>
    </>
  );
}
