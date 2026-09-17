"use client";

import { useEffect, useState } from "react";
import TopNav from "../components/TopNav";
import { fetchStats, fetchPayments, fetchMaintenanceRequests } from "../lib/api";

export default function Dashboard() {
  const [stats, setStats] = useState({ properties: 0, pendingMaintenance: 0, monthlyRevenue: 0 });
  const [payments, setPayments] = useState([]);
  const [maintenanceRequests, setMaintenanceRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingError, setLoadingError] = useState(null);
  const [username, setUsername] = useState("");

  async function loadData() {
    const token = typeof window !== "undefined" ? (localStorage.getItem("token") || document.cookie.match(/(?:^|;\s*)token=([^;]+)/)?.[1]) : null;
    const storedUser = typeof window !== "undefined" ? localStorage.getItem("username") : "";
    if (!token) {
      window.location.href = "/auth/login?callbackUrl=/dashboard";
      return;
    }
    if(storedUser) setUsername(storedUser);

    setLoading(true);
    setLoadingError(null);

    try {
      const [s, p, m] = await Promise.all([
        fetchStats().catch(() => ({ properties: 0, pendingMaintenance: 0, monthlyRevenue: 0 })),
        fetchPayments().catch((err) => { throw new Error("Failed to load payments (" + err.message + ")"); }),
        fetchMaintenanceRequests().catch((err) => { throw new Error("Failed to load maintenance (" + err.message + ")"); }),
      ]);

      setStats(s);
      setPayments(p);
      setMaintenanceRequests(m);
    } catch (e) {
      setLoadingError(e.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f3f8f6]">
        <TopNav />
        <main className="wrapper page flex items-center justify-center h-[60vh]">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-teal-200 border-t-teal-600 rounded-full animate-spin"></div>
            <p className="text-teal-800 font-medium text-lg">Loading your dashboard...</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f3f8f6]">
      <TopNav />
      <main className="wrapper page">
        
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Welcome back{username ? `, ${username}` : ''}! 👋</h1>
          <p className="text-teal-700 mt-2 text-lg">Here's what's happening with your properties and payments today.</p>
        </div>

        {loadingError && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md mb-8 flex justify-between items-center shadow-sm">
            <div>
              <p className="text-red-800 font-bold">Error loading data</p>
              <p className="text-red-600 text-sm">{loadingError}</p>
            </div>
            <button onClick={loadData} className="px-4 py-2 bg-red-100 text-red-800 rounded hover:bg-red-200 transition-colors font-semibold text-sm">
              Retry
            </button>
          </div>
        )}

        {/* Stats Grid */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-teal-50 flex flex-col justify-between transform hover:-translate-y-1 transition-all duration-300 hover:shadow-md relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10 text-teal-800">
              <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"></path></svg>
            </div>
            <p className="text-sm font-semibold text-teal-600 uppercase tracking-wider">Properties</p>
            <div className="mt-4">
              <span className="text-4xl font-black text-gray-900">{stats.properties}</span>
            </div>
            <p className="text-xs text-gray-500 mt-2">Active listings on platform</p>
          </div>
          
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-teal-50 flex flex-col justify-between transform hover:-translate-y-1 transition-all duration-300 hover:shadow-md relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10 text-amber-800">
              <svg className="w-16 h-16" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"></path></svg>
            </div>
            <p className="text-sm font-semibold text-amber-600 uppercase tracking-wider">Pending Maintenance</p>
            <div className="mt-4">
              <span className="text-4xl font-black text-gray-900">{stats.pendingMaintenance}</span>
            </div>
            <p className="text-xs text-gray-500 mt-2">Requires immediate attention</p>
          </div>

          <div className="bg-white rounded-2xl p-6 shadow-sm border border-teal-50 flex flex-col justify-between transform hover:-translate-y-1 transition-all duration-300 hover:shadow-md relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10 text-emerald-800">
              <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
            </div>
            <p className="text-sm font-semibold text-emerald-600 uppercase tracking-wider">Revenue / Paid</p>
            <div className="mt-4 flex items-end">
              <span className="text-3xl md:text-4xl font-black text-gray-900">₹{Number(stats.monthlyRevenue).toLocaleString("en-IN")}</span>
            </div>
            <p className="text-xs text-gray-500 mt-2">Total collection volume</p>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Payments Panel */}
          <div className="bg-white rounded-2xl shadow-sm border border-teal-50 flex flex-col h-full overflow-hidden">
            <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
              <h2 className="text-lg font-bold text-gray-800">Recent Payments</h2>
              <a href="/payment" className="text-sm text-teal-600 font-semibold hover:text-teal-800 transition-colors">View All &rarr;</a>
            </div>
            <div className="p-6 flex-1 overflow-auto">
              {payments.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-400 italic">No payment records found.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {payments.slice(0, 5).map((p) => (
                    <div key={p.id} className="flex justify-between items-center p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors border border-gray-100">
                      <div className="flex items-center gap-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white shadow-sm ${p.status === 'Paid' ? 'bg-emerald-500' : 'bg-amber-400'}`}>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                        </div>
                        <div>
                          <p className="font-bold text-gray-900">{p.property}</p>
                          <p className="text-xs text-gray-500">{p.dueDate} &bull; ID: {p.id}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-900">₹{p.amount.toLocaleString("en-IN")}</p>
                        <span className={`inline-block px-2 py-1 mt-1 rounded text-[10px] font-bold uppercase tracking-wider ${p.status === 'Paid' ? 'bg-emerald-100 text-emerald-800' : p.status === 'Pending' ? 'bg-amber-100 text-amber-800' : 'bg-gray-100 text-gray-800'}`}>
                          {p.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Maintenance Panel */}
          <div className="bg-white rounded-2xl shadow-sm border border-teal-50 flex flex-col h-full overflow-hidden">
            <div className="p-6 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
              <h2 className="text-lg font-bold text-gray-800">Maintenance Tickets</h2>
              <a href="/maintenance" className="text-sm text-teal-600 font-semibold hover:text-teal-800 transition-colors">View All &rarr;</a>
            </div>
            <div className="p-6 flex-1 overflow-auto">
              {maintenanceRequests.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-400 italic">No maintenance tickets found.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {maintenanceRequests.slice(0, 5).map((m) => (
                    <div key={m.id} className="flex justify-between items-start p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors border border-gray-100">
                      <div className="flex items-start gap-4">
                        <div className={`mt-1 w-2 h-2 rounded-full ${m.priority === 'High' ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]' : m.priority === 'Medium' ? 'bg-amber-500' : 'bg-teal-500'}`}></div>
                        <div>
                          <p className="font-bold text-gray-900 leading-tight">{m.issue}</p>
                          <p className="text-xs text-gray-500 mt-1">{m.property} &bull; Ticket: {m.id}</p>
                        </div>
                      </div>
                      <div className="text-right flex flex-col items-end gap-2">
                        <span className={`inline-block px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${m.status === 'Completed' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                          {m.status}
                        </span>
                        <span className="text-[10px] font-semibold text-gray-400 uppercase">
                          {m.priority} Priority
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}
