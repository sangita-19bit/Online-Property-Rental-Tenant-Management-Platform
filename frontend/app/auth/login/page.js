"use client";

import { useState, useEffect } from "react";
import TopNav from "../../components/TopNav";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loggedInUser, setLoggedInUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("username");
    if (token && storedUser) {
      setLoggedInUser(storedUser);
      document.cookie = `token=${token}; path=/; max-age=86400; SameSite=Lax`;
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("https://online-property-rental-tenant-management.onrender.com/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        throw new Error("Invalid credentials");
      }

      const data = await res.json();
      localStorage.setItem("token", data.token);
      localStorage.setItem("username", data.username);
      document.cookie = `token=${data.token}; path=/; max-age=86400; SameSite=Lax`;
      
      // Redirect to dashboard
      router.push("/dashboard");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    document.cookie = "token=; path=/; max-age=0; SameSite=Lax";
    setLoggedInUser(null);
    setUsername("");
    setPassword("");
  };

  return (
    <>
      <TopNav />
      <main className="page wrapper">
        <h1>Login</h1>
        <p className="muted">Sign in to access your dashboard.</p>

        <section className="card" style={{ maxWidth: "520px" }}>
          {loggedInUser ? (
            <div style={{ padding: "1rem 0" }}>
              <p style={{ fontSize: "1.1rem", marginBottom: "1.5rem" }}>
                You are currently logged in as <strong>{loggedInUser}</strong>.
              </p>
              <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
                <button onClick={handleSignOut} className="btn btn-secondary" style={{ color: "#d32f2f", borderColor: "#ffcdcd" }}>
                  Sign Out
                </button>
                <Link href="/dashboard" className="btn btn-primary">
                  Go to Dashboard
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleLogin}>
              {error && <p style={{ color: "red" }}>{error}</p>}
              <p>
                <label htmlFor="username">Username</label>
                <br />
                <input
                  id="username"
                  type="text"
                  placeholder="Username (e.g. EndUser)"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  style={{ width: "100%", padding: "0.6rem", marginTop: "0.3rem" }}
                  required
                />
              </p>

              <p>
                <label htmlFor="password">Password</label>
                <br />
                <input
                  id="password"
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{ width: "100%", padding: "0.6rem", marginTop: "0.3rem" }}
                  required
                />
              </p>

              <div className="flex justify-between items-center w-full mt-3" style={{ marginTop: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <button type="submit" className="btn btn-primary">
                  Sign In
                </button>
                <Link href="/auth/signup" style={{ color: "#0070f3", textDecoration: "none" }}>
                  Don't have an account? Sign up
                </Link>
              </div>
            </form>
          )}
        </section>
      </main>
    </>
  );
}
