export const API_BASE =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://online-property-rental-tenant-management.onrender.com/api";

export function getStoredToken() {
  if (typeof window === "undefined") return null;

  // Try localStorage first
  const localToken = localStorage.getItem("token");
  if (localToken) return localToken;

  // Fallback to cookie
  const match = document.cookie.match(/(?:^|;\s*)token=([^;]+)/);
  return match ? match[1] : null;
}

export function clearAuthSession() {
  if (typeof window !== "undefined") {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    document.cookie = "token=; path=/; max-age=0; SameSite=Lax";
  }
}

export function saveAuthSession(token, username) {
  if (typeof window !== "undefined") {
    localStorage.setItem("token", token);
    if (username) localStorage.setItem("username", username);
    document.cookie = `token=${token}; path=/; max-age=86400; SameSite=Lax`;
  }
}

export function getAuthHeaders() {
  const headers = {
    "Content-Type": "application/json",
  };

  const token = getStoredToken();
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  return headers;
}

export async function fetchWithTimeout(url, options = {}, timeoutMs = 25000) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const res = await fetch(url, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (res.status === 401 || res.status === 403) {
      clearAuthSession();
    }

    return res;
  } catch (error) {
    clearTimeout(timeoutId);
    if (error.name === "AbortError") {
      throw new Error(
        "Request timed out. The backend server might be starting up (Render free tier). Please try again in a few moments."
      );
    }
    throw error;
  }
}

export async function loginUser(username, password) {
  const res = await fetchWithTimeout(`${API_BASE}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) {
    const errorText = await res.text().catch(() => "");
    throw new Error(errorText || "Invalid credentials or login failed.");
  }

  const data = await res.json();
  saveAuthSession(data.token, data.username);
  return data;
}

export async function registerUser(username, password) {
  const res = await fetchWithTimeout(`${API_BASE}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  if (!res.ok) {
    const errorText = await res.text().catch(() => "");
    throw new Error(errorText || "Registration failed. Username may already exist.");
  }

  return res.text();
}

export async function fetchProperties() {
  const res = await fetchWithTimeout(`${API_BASE}/properties`, {
    cache: "no-store",
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Failed to fetch properties");
  return res.json();
}

export async function fetchPayments() {
  const res = await fetchWithTimeout(`${API_BASE}/payments`, {
    cache: "no-store",
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Failed to fetch payments");
  return res.json();
}

export async function fetchMaintenanceRequests() {
  const res = await fetchWithTimeout(`${API_BASE}/maintenance`, {
    cache: "no-store",
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Failed to fetch maintenance requests");
  return res.json();
}

export async function fetchStats() {
  const res = await fetchWithTimeout(`${API_BASE}/stats`, {
    cache: "no-store",
    headers: getAuthHeaders(),
  });
  if (!res.ok) throw new Error("Failed to fetch stats");
  return res.json();
}
