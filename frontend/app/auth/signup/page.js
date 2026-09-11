"use client";

import { useState } from "react";
import TopNav from "../../components/TopNav";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { registerUser } from "../../lib/api";

export default function SignUpPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [slowNotice, setSlowNotice] = useState(false);
  const router = useRouter();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    setSlowNotice(false);

    const slowTimer = setTimeout(() => {
      setSlowNotice(true);
    }, 3000);

    try {
      await registerUser(username, password);
      clearTimeout(slowTimer);
      setSuccess("Account created successfully! Redirecting to login...");
      setTimeout(() => {
        router.push("/auth/login");
      }, 1500);
    } catch (err) {
      clearTimeout(slowTimer);
      setError(err.message || "Registration failed. Please try a different username.");
      setLoading(false);
      setSlowNotice(false);
    }
  };

  return (
    <>
      <TopNav />
      <main className="page wrapper">
        <h1>Sign Up</h1>
        <p className="muted">Create an account to access the platform.</p>

        <section className="card" style={{ maxWidth: "520px", marginTop: "1rem" }}>
          <form onSubmit={handleSignUp}>
            {error && (
              <div
                style={{
                  color: "#991b1b",
                  background: "#fee2e2",
                  border: "1px solid #f87171",
                  borderRadius: "8px",
                  padding: "0.75rem",
                  marginBottom: "1rem",
                  fontSize: "0.9rem",
                }}
              >
                {error}
              </div>
            )}
            {slowNotice && (
              <div
                style={{
                  color: "#854d0e",
                  background: "#fef9c3",
                  border: "1px solid #fde047",
                  borderRadius: "8px",
                  padding: "0.75rem",
                  marginBottom: "1rem",
                  fontSize: "0.88rem",
                }}
              >
                ⏳ Connecting to server. Render's free tier spins down when idle, so the initial startup may take 30–60 seconds...
              </div>
            )}
            {success && (
              <div
                style={{
                  color: "#166534",
                  background: "#dcfce7",
                  border: "1px solid #86efac",
                  borderRadius: "8px",
                  padding: "0.75rem",
                  marginBottom: "1rem",
                  fontSize: "0.9rem",
                }}
              >
                {success}
              </div>
            )}

            <p>
              <label htmlFor="username">Username</label>
              <br />
              <input
                id="username"
                type="text"
                placeholder="Choose a username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={loading}
                style={{
                  width: "100%",
                  padding: "0.6rem",
                  marginTop: "0.3rem",
                  borderRadius: "6px",
                  border: "1px solid var(--border)",
                }}
                required
              />
            </p>

            <p style={{ marginTop: "1rem" }}>
              <label htmlFor="password">Password</label>
              <br />
              <input
                id="password"
                type="password"
                placeholder="Choose a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                style={{
                  width: "100%",
                  padding: "0.6rem",
                  marginTop: "0.3rem",
                  borderRadius: "6px",
                  border: "1px solid var(--border)",
                }}
                required
              />
            </p>

            <div
              className="flex justify-between items-center w-full mt-3"
              style={{
                marginTop: "1.5rem",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
                style={{ opacity: loading ? 0.7 : 1, cursor: loading ? "not-allowed" : "pointer" }}
              >
                {loading ? "Signing up..." : "Sign Up"}
              </button>
              <Link href="/auth/login" style={{ color: "#0070f3", textDecoration: "none", fontSize: "0.9rem" }}>
                Already have an account? Login
              </Link>
            </div>
          </form>
        </section>
      </main>
    </>
  );
}
