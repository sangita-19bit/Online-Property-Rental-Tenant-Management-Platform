"use client";

import { useState } from "react";
import TopNav from "../../components/TopNav";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignUpPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      const res = await fetch("http://localhost:8081/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        const errorMsg = await res.text();
        throw new Error(errorMsg || "Registration failed");
      }

      setSuccess("Account created successfully! Redirecting to login...");
      setTimeout(() => {
        router.push("/auth/login");
      }, 2000);
    } catch (err) {
      setError(err.message);
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
            {error && <p style={{ color: "red", marginBottom: "1rem" }}>{error}</p>}
            {success && <p style={{ color: "green", marginBottom: "1rem" }}>{success}</p>}
            <p>
              <label htmlFor="username">Username</label>
              <br />
              <input
                id="username"
                type="text"
                placeholder="Choose a username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{ width: "100%", padding: "0.6rem", marginTop: "0.3rem" }}
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
                style={{ width: "100%", padding: "0.6rem", marginTop: "0.3rem" }}
                required
              />
            </p>

            <div className="flex justify-between items-center w-full mt-3" style={{ marginTop: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <button type="submit" className="btn btn-primary">
                Sign Up
              </button>
              <Link href="/auth/login" style={{ color: "#0070f3", textDecoration: "none" }}>
                Already have an account? Login
              </Link>
            </div>
          </form>
        </section>
      </main>
    </>
  );
}
