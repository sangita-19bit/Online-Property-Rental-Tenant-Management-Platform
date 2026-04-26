const API_BASE = "http://localhost:8081/api";

function getAuthHeaders() {
  const headers = {
    "Content-Type": "application/json",
  };
  
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }
  
  return headers;
}

export async function fetchProperties() {
  const res = await fetch(`${API_BASE}/properties`, { 
    cache: "no-store",
    headers: getAuthHeaders()
  });
  if (!res.ok) throw new Error("Failed to fetch properties");
  return res.json();
}

export async function fetchPayments() {
  const res = await fetch(`${API_BASE}/payments`, { 
    cache: "no-store",
    headers: getAuthHeaders()
  });
  if (!res.ok) throw new Error("Failed to fetch payments");
  return res.json();
}

export async function fetchMaintenanceRequests() {
  const res = await fetch(`${API_BASE}/maintenance`, { 
    cache: "no-store",
    headers: getAuthHeaders()
  });
  if (!res.ok) throw new Error("Failed to fetch maintenance requests");
  return res.json();
}

export async function fetchStats() {
  const res = await fetch(`${API_BASE}/stats`, { 
    cache: "no-store",
    headers: getAuthHeaders()
  });
  if (!res.ok) throw new Error("Failed to fetch stats");
  return res.json();
}
