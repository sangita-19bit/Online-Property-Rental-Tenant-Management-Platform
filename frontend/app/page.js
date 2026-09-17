"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import TopNav from "./components/TopNav";
import { fetchProperties } from "./lib/api";

export default function RootPage() {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState(0); // 0: All, 1: Rent, 2: Sale
  
  const tabs = ["All", "Rent", "Sale"];

  useEffect(() => {
    async function loadProps() {
      try {
        const data = await fetchProperties();
        setProperties(data);
      } catch (e) {
        console.error("Could not load properties:", e.message);
      } finally {
        setLoading(false);
      }
    }
    loadProps();
  }, []);

  // Filter properties locally
  const filteredProperties = properties.filter(p => {
    if (activeTab === 0) return true;
    if (activeTab === 1) return p.type === "Rent";
    if (activeTab === 2) return p.type === "Sale";
    return true;
  });

  return (
    <div className="min-h-screen bg-[#f3f8f6]">
      <TopNav />
      <main className="wrapper page">
        {/* Hero Section */}
        <section className="hero flex flex-col items-center justify-center text-center shadow-lg rounded-3xl overflow-hidden relative pb-12 pt-16">
          <div className="relative z-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-6 drop-shadow-md">
              Discover Your Perfect Home
            </h1>
            <p className="text-lg md:text-xl text-teal-50 max-w-2xl mx-auto mb-10 drop-shadow">
              Seamlessly browse premium properties for rent and sale directly from verified owners and trusted agents.
            </p>
            
            {/* Apple-style segmented control slider */}
            <div className="inline-flex relative bg-teal-900/60 p-1.5 rounded-2xl backdrop-blur-md shadow-inner border border-teal-700/50">
              <div 
                className="absolute top-1.5 bottom-1.5 rounded-xl bg-white shadow-lg transition-all duration-400 cubic-bezier(0.4, 0, 0.2, 1)" 
                style={{ 
                  width: 'calc(33.333% - 4px)', 
                  transform: `translateX(calc(${activeTab * 100}% + ${activeTab * 4}px))` 
                }} 
              />
              
              <button 
                onClick={() => setActiveTab(0)} 
                className={`relative z-10 w-28 sm:w-36 py-3 text-sm sm:text-base font-bold transition-colors duration-300 ${activeTab === 0 ? 'text-teal-900' : 'text-teal-50 hover:text-white'}`}
              >
                All Properties
              </button>
              <button 
                onClick={() => setActiveTab(1)} 
                className={`relative z-10 w-28 sm:w-36 py-3 text-sm sm:text-base font-bold transition-colors duration-300 ${activeTab === 1 ? 'text-teal-900' : 'text-teal-50 hover:text-white'}`}
              >
                For Rent
              </button>
              <button 
                onClick={() => setActiveTab(2)} 
                className={`relative z-10 w-28 sm:w-36 py-3 text-sm sm:text-base font-bold transition-colors duration-300 ${activeTab === 2 ? 'text-teal-900' : 'text-teal-50 hover:text-white'}`}
              >
                For Sale
              </button>
            </div>
          </div>
        </section>

        {/* Property Grid */}
        <section className="mt-12">
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <div className="w-12 h-12 border-4 border-teal-200 border-t-teal-600 rounded-full animate-spin mb-4"></div>
              <p className="text-teal-700 font-medium">Loading properties...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProperties.length === 0 && (
                <div className="col-span-full bg-white rounded-3xl shadow-sm border border-teal-100 text-center p-16">
                  <div className="text-teal-800 mb-4">
                    <svg className="w-16 h-16 mx-auto opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
                  </div>
                  <p className="text-2xl font-bold text-teal-900">No properties found</p>
                  <p className="text-teal-600 mt-2 text-lg">Try adjusting your filters or check back later.</p>
                </div>
              )}
              
              {filteredProperties.map((item) => (
                <article 
                  key={item.id} 
                  className="bg-white border border-teal-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col transform hover:-translate-y-2 group"
                >
                  {/* Card Image */}
                  <div className="relative h-60 w-full overflow-hidden bg-teal-50">
                    {item.image ? (
                      <img 
                        src={item.image} 
                        alt={item.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-teal-300 font-medium">
                        <span>No Image</span>
                      </div>
                    )}
                    <div className="absolute top-4 right-4">
                      <span className={`px-4 py-1.5 rounded-full text-sm font-extrabold shadow-md backdrop-blur-md ${item.type === 'Sale' ? 'bg-emerald-100/90 text-emerald-900 border border-emerald-200' : 'bg-blue-100/90 text-blue-900 border border-blue-200'}`}>
                        {item.type}
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-7 flex-1 flex flex-col">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2 line-clamp-1" title={item.title}>
                        {item.title}
                      </h3>
                      <p className="text-teal-700 font-medium text-sm flex items-center mb-6">
                        <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                        {item.city}
                      </p>
                      
                      <div className="flex items-center justify-between text-gray-600 text-sm mb-6 bg-gray-50 rounded-xl p-3 border border-gray-100">
                        <span className="flex flex-col items-center font-medium" title="Bedrooms">
                          <svg className="w-5 h-5 mb-1 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
                          {item.bedrooms} Bed
                        </span>
                        <div className="w-px h-8 bg-gray-200"></div>
                        <span className="flex flex-col items-center font-medium" title="Bathrooms">
                          <svg className="w-5 h-5 mb-1 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg>
                          {item.bathrooms} Bath
                        </span>
                        <div className="w-px h-8 bg-gray-200"></div>
                        <span className="flex flex-col items-center font-medium" title="Square Feet">
                          <svg className="w-5 h-5 mb-1 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"></path></svg>
                          {item.area} sqft
                        </span>
                      </div>
                      
                      <div className="mt-auto">
                        <p className="text-3xl font-black text-gray-900 tracking-tight">
                          ₹{item.rent?.toLocaleString("en-IN")}
                          {item.type === 'Rent' && <span className="text-base font-medium text-gray-500 ml-1">/mo</span>}
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 pt-6 border-t border-teal-50 flex justify-between items-center">
                      <span className="text-sm font-bold px-3 py-1.5 bg-gray-100 text-gray-600 rounded-lg">
                        {item.status}
                      </span>
                      <Link 
                        href={`/properties/${item.id}`} 
                        className="bg-teal-700 hover:bg-teal-800 text-white px-6 py-3 rounded-xl text-sm font-extrabold transition-all active:scale-95 shadow-md flex items-center group-hover:bg-teal-600"
                        style={{ color: '#ffffff' }}
                      >
                        View Details
                        <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
