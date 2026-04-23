import TopNav from "../../components/TopNav";

export default function LoginPage() {
  return (
    <>
      <TopNav />
      <main className="page wrapper">
        <h1>Login</h1>
        <p className="muted">Frontend placeholder for JWT login integration with Spring Boot.</p>

        <section className="card" style={{ maxWidth: "520px" }}>
          <form>
            <p>
              <label htmlFor="email">Email</label>
              <br />
              <input
                id="email"
                type="email"
                placeholder="user@example.com"
                style={{ width: "100%", padding: "0.6rem", marginTop: "0.3rem" }}
              />
            </p>

            <p>
              <label htmlFor="password">Password</label>
              <br />
              <input
                id="password"
                type="password"
                placeholder="Enter password"
                style={{ width: "100%", padding: "0.6rem", marginTop: "0.3rem" }}
              />
            </p>

            <div className="flex justify-start items-center w-full mt-3">
              <button type="button" className="btn btn-primary">
                Sign In
              </button>
            </div>
          </form>
        </section>
      </main>
    </>
  );
}
