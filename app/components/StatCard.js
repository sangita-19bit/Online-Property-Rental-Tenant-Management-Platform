export default function StatCard({ label, value, hint }) {
  return (
    <article className="card">
      <p className="muted">{label}</p>
      <p className="kpi">{value}</p>
      {hint ? <p className="muted">{hint}</p> : null}
    </article>
  );
}
