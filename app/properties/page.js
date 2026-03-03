import TopNav from "../components/TopNav";
import { properties } from "../lib/mockData";

function badgeForStatus(status) {
  if (status === "Approved") return "badge badge-success";
  if (status === "Pending Approval") return "badge badge-warning";
  return "badge badge-info";
}

export default function PropertiesPage() {
  return (
    <>
      <TopNav />
      <main className="page wrapper">
        <h1>Properties</h1>
        <p className="muted">Explore available listings and approval status.</p>

        <section className="grid grid-3" style={{ marginTop: "1rem" }}>
          {properties.map((item) => (
            <article key={item.id} className="card">
              <h3>{item.title}</h3>
              <p className="muted">{item.city}</p>
              <p className="kpi">INR {item.rent.toLocaleString("en-IN")}/month</p>
              <p>
                <span className={badgeForStatus(item.status)}>{item.status}</span>
              </p>
              <p className="muted">Available from: {item.availableFrom}</p>
              <p className="muted">Amenities: {item.amenities.join(", ")}</p>
            </article>
          ))}
        </section>
      </main>
    </>
  );
}
