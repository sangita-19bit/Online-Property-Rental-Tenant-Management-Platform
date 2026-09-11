"use client";

import { useState, useEffect, Suspense } from "react";
import TopNav from "../../components/TopNav";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { loginUser, clearAuthSession, getStoredToken } from "../../lib/api";

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [slowNotice, setSlowNotice] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

  useEffect(() => {
    const token = getStoredToken();
    const storedUser = localStorage.getItem("username");
    if (token && storedUser) {
      setLoggedInUser(storedUser);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    setSlowNotice(false);

    // If request takes longer than 3 seconds, Render free tier is likely spinning up
    const slowTimer = setTimeout(() => {
      setSlowNotice(true);
    }, 3000);

    try {
      await loginUser(username, password);
      clearTimeout(slowTimer);
      router.push(callbackUrl);
      router.refresh();
    } catch (err) {
      clearTimeout(slowTimer);
      setError(err.message || "Login failed. Please check your credentials.");
      setLoading(false);
      setSlowNotice(false);
    }
  };

  const handleSignOut = () => {
    clearAuthSession();
    setLoggedInUser(null);
    setUsername("");
    setPassword("");
    router.refresh();
  };

  return (
    <section className="card" style={{ maxWidth: "520px" }}>
      {loggedInUser ? (
        <div style={{ padding: "1rem 0" }}>
          <p style={{ fontSize: "1.1rem", marginBottom: "1.5rem" }}>
            You are currently logged in as <strong>{loggedInUser}</strong>.
          </p>
          <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
            <button
              onClick={handleSignOut}
              className="btn btn-secondary"
              style={{ color: "#d32f2f", borderColor: "#ffcdcd" }}
            >
              Sign Out
            </button>
            <Link href="/dashboard" className="btn btn-primary">
              Go to Dashboard
            </Link>
          </div>
        </div>
      ) : (
        <form onSubmit={handleLogin}>
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

          <p>
            <label htmlFor="username">Username</label>
            <br />
            <input
              id="username"
              type="text"
              placeholder="Username (e.g. EndUser)"
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
              placeholder="Enter password (e.g. sangi19)"
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
              {loading ? "Signing in..." : "Sign In"}
            </button>
            <Link href="/auth/signup" style={{ color: "#0070f3", textDecoration: "none", fontSize: "0.9rem" }}>
              Don't have an account? Sign up
            </Link>
          </div>
        </form>
      )}
    </section>
  );
}

export default function LoginPage() {
  return (
    <>
      <TopNav />
      <main className="page wrapper">
        <h1>Login</h1>
        <p className="muted">Sign in to access your dashboard.</p>
        <Suspense fallback={<p>Loading...</p>}>
          <LoginForm />
        </Suspense>
      </main>
    </>
  );
}
