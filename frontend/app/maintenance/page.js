"use client";

import { useEffect, useState } from "react";
import TopNav from "../components/TopNav";
import { fetchMaintenanceRequests, createMaintenanceRequest } from "../lib/api";

export default function MaintenancePage() {
  const [maintenanceRequests, setMaintenanceRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [issue, setIssue] = useState("");
  const [property, setProperty] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("");

  async function loadData() {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchMaintenanceRequests();
      setMaintenanceRequests(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("");

    try {
      await createMaintenanceRequest({
        issue,
        property,
        priority,
        status: "Pending"
      });
      setSubmitStatus("success");
      setIssue("");
      setProperty("");
      setPriority("Medium");
      loadData();
      
      setTimeout(() => setSubmitStatus(""), 4000);
    } catch (err) {
      setSubmitStatus("error:" + err.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#f3f8f6]">
      <TopNav />
      <main className="wrapper page">
        
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Maintenance Hub</h1>
          <p className="text-teal-700 mt-2 text-lg">Submit new requests and track your existing ticketing workflow.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Submit Request Form */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl shadow-sm border border-teal-50 p-6 xl:p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5 text-teal-800 pointer-events-none">
                <svg className="w-32 h-32 -mr-8 -mt-8" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"></path></svg>
              </div>

              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <svg className="w-5 h-5 mr-2 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>
                New Request
              </h2>
              
              {submitStatus && (
                <div className={`p-4 rounded-xl mb-6 text-sm font-medium flex items-start gap-3 ${submitStatus === 'success' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
                  {submitStatus === 'success' ? (
                    <>
                      <svg className="w-5 h-5 text-emerald-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                      <p>Request submitted successfully! Our team will review it shortly.</p>
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5 text-red-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                      <p>Submission failed: {submitStatus.replace('error:', '')}</p>
                    </>
                  )}
                </div>
              )}
              
              <form onSubmit={handleSubmit} className="relative z-10">
                <div className="mb-5">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Property</label>
                  <input 
                    type="text" 
                    value={property}
                    onChange={e => setProperty(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-shadow outline-none bg-gray-50 focus:bg-white"
                    placeholder="e.g. Skyline Residency"
                  />
                </div>
                
                <div className="mb-5">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Issue Description</label>
                  <textarea 
                    value={issue}
                    onChange={e => setIssue(e.target.value)}
                    required
                    rows="3"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-shadow outline-none bg-gray-50 focus:bg-white resize-y"
                    placeholder="Describe the problem in detail..."
                  />
                </div>

                <div className="mb-8">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Priority</label>
                  <select 
                    value={priority}
                    onChange={e => setPriority(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-shadow outline-none bg-gray-50 focus:bg-white cursor-pointer appearance-none"
                  >
                    <option value="Low">Low - Not urgent</option>
                    <option value="Medium">Medium - Needs attention</option>
                    <option value="High">High - Urgent / Emergency</option>
                  </select>
                </div>
                
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-teal-700 hover:bg-teal-800 text-white font-bold py-4 px-6 rounded-xl transition-all active:scale-95 shadow-md flex justify-center items-center gap-2 disabled:opacity-70 disabled:active:scale-100"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="w-5 h-5 animate-spin text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <span>Submit Ticket</span>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
          
          {/* Requests History */}
          <div className="lg:col-span-7">
            <h2 className="text-xl font-bold text-gray-900 mb-6 mt-4 lg:mt-0 flex items-center">
              <svg className="w-5 h-5 mr-2 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
              Your Requests
            </h2>
            
            {error && (
              <div className="bg-red-50 text-red-800 p-4 rounded-xl border border-red-100 mb-6">
                Error loading requests: {error}
              </div>
            )}

            {loading ? (
              <div className="bg-white rounded-2xl shadow-sm border border-teal-50 p-12 flex flex-col items-center justify-center">
                <div className="w-10 h-10 border-4 border-teal-100 border-t-teal-600 rounded-full animate-spin mb-4"></div>
                <p className="text-teal-700 font-medium">Loading requests...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {maintenanceRequests.length === 0 ? (
                  <div className="col-span-full bg-white rounded-2xl shadow-sm border border-teal-50 p-12 text-center text-gray-500 italic flex flex-col items-center">
                    <svg className="w-12 h-12 text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                    No maintenance requests found.
                  </div>
                ) : (
                  maintenanceRequests.map((item) => (
                    <article key={item.id} className="bg-white rounded-2xl p-5 shadow-sm border border-teal-50 flex flex-col h-full transform transition-transform hover:-translate-y-1 hover:shadow-md">
                      <div className="flex justify-between items-start mb-3">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                          item.priority === 'High' ? 'bg-red-100 text-red-800' : 
                          item.priority === 'Medium' ? 'bg-amber-100 text-amber-800' : 'bg-teal-100 text-teal-800'
                        }`}>
                          <div className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                            item.priority === 'High' ? 'bg-red-500' : 
                            item.priority === 'Medium' ? 'bg-amber-500' : 'bg-teal-500'
                          }`}></div>
                          {item.priority}
                        </span>
                        
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                          item.status === 'Completed' ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {item.status}
                        </span>
                      </div>
                      
                      <h3 className="font-bold text-gray-900 text-lg mb-1 line-clamp-2">{item.issue}</h3>
                      
                      <div className="mt-auto pt-4 flex items-center justify-between text-sm">
                        <span className="text-gray-500 flex items-center">
                          <svg className="w-4 h-4 mr-1 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                          <span className="truncate max-w-[120px]" title={item.property}>{item.property}</span>
                        </span>
                        <span className="text-gray-400 font-mono text-xs">#{item.id}</span>
                      </div>
                    </article>
                  ))
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
