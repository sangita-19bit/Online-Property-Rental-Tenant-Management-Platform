"use client";

import { useEffect, useState } from "react";
import TopNav from "../components/TopNav";
import { fetchProperties } from "../lib/api";
import Link from "next/link";

export default function PropertiesPage() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [slowNotice, setSlowNotice] = useState(false);

  async function loadData() {
    setLoading(true);
    setError(null);
    setSlowNotice(false);

    const slowTimer = setTimeout(() => {
      setSlowNotice(true);
    }, 3000);

    try {
      const data = await fetchProperties();
      setProperties(data);
      clearTimeout(slowTimer);
    } catch (e) {
      clearTimeout(slowTimer);
      setError(e.message);
      console.error("Could not load properties:", e.message);
    } finally {
      clearTimeout(slowTimer);
      setLoading(false);
      setSlowNotice(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="min-h-screen bg-[#f3f8f6]">
      <TopNav />
      <main className="wrapper page">
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Properties Listing</h1>
          <p className="text-teal-700 mt-2 text-lg">Explore all available listings and their current approval status.</p>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-md mb-8 flex justify-between items-center shadow-sm">
            <div>
              <p className="text-red-800 font-bold">Error loading properties</p>
              <p className="text-red-600 text-sm">{error}</p>
            </div>
            <button onClick={loadData} className="px-4 py-2 bg-red-100 text-red-800 rounded hover:bg-red-200 transition-colors font-semibold text-sm">
              Retry
            </button>
          </div>
        )}

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl shadow-sm border border-teal-50">
            <div className="w-12 h-12 border-4 border-teal-200 border-t-teal-600 rounded-full animate-spin mb-4"></div>
            <p className="text-teal-700 font-medium">Loading properties list...</p>
            {slowNotice && (
              <p className="text-amber-600 mt-4 max-w-md text-center text-sm font-medium bg-amber-50 p-3 rounded-lg border border-amber-100">
                ⏳ The backend server might be waking up from sleep mode. This could take up to 50 seconds...
              </p>
            )}
          </div>
        ) : (
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.length === 0 && !error && (
              <div className="col-span-full bg-white rounded-3xl shadow-sm border border-teal-100 text-center p-16">
                <div className="text-teal-800 mb-4">
                  <svg className="w-16 h-16 mx-auto opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                </div>
                <p className="text-2xl font-bold text-teal-900">No properties found</p>
                <p className="text-teal-600 mt-2 text-lg">There are currently no listings to display.</p>
                <button onClick={loadData} className="mt-6 px-6 py-2.5 bg-teal-50 text-teal-700 hover:bg-teal-100 font-bold rounded-xl transition-colors ring-1 ring-teal-200">
                  Refresh List
                </button>
              </div>
            )}
            
            {properties.map((item) => (
              <article 
                key={item.id} 
                className="bg-white border border-teal-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group relative"
              >
                <div className="p-7 flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${item.status === 'Approved' ? 'bg-emerald-100 text-emerald-800' : item.status === 'Pending Approval' ? 'bg-amber-100 text-amber-800' : 'bg-blue-100 text-blue-800'}`}>
                      {item.status}
                    </span>
                    <span className="text-gray-400 font-mono text-xs font-medium">#{item.id}</span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                    {item.title}
                  </h3>
                  
                  <p className="text-teal-600 text-sm flex items-center mb-5">
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                    {item.city}
                  </p>
                  
                  <div className="bg-gray-50 rounded-xl p-4 border border-gray-100 mb-5">
                    <p className="text-2xl font-black text-gray-900 tracking-tight">
                      ₹{item.rent?.toLocaleString("en-IN")}
                      {item.type === 'Rent' && <span className="text-sm font-medium text-gray-500 ml-1 font-normal">/mo</span>}
                    </p>
                  </div>
                  
                  <div className="space-y-2 mb-6">
                    <p className="text-sm text-gray-600 flex items-center">
                      <svg className="w-4 h-4 mr-2 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                      Available from: <span className="font-bold text-gray-900 ml-1">{item.availableFrom}</span>
                    </p>
                    {item.amenities && item.amenities.length > 0 && (
                      <p className="text-sm text-gray-600 flex items-start">
                        <svg className="w-4 h-4 mr-2 text-gray-400 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                        <span className="line-clamp-1">{item.amenities.join(", ")}</span>
                      </p>
                    )}
                  </div>

                  <div className="mt-auto pt-5 border-t border-teal-50">
                    <Link 
                      href={`/properties/${item.id}`} 
                      className="block text-center bg-white hover:bg-teal-50 text-teal-700 border border-teal-200 px-5 py-2.5 rounded-xl text-sm font-bold transition-colors w-full"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </section>
        )}
      </main>
    </div>
  );
}
