"use client";

import { useEffect, useState, Suspense } from "react";
import TopNav from "../components/TopNav";
import { fetchPayments, createPayment } from "../lib/api";
import { useSearchParams } from "next/navigation";

function PaymentContent() {
  const searchParams = useSearchParams();
  const prefillPropertyId = searchParams.get("propertyId") || "";
  const prefillTitle = searchParams.get("title") || "";
  const prefillAmount = searchParams.get("amount") || "";

  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [payProperty, setPayProperty] = useState(prefillTitle);
  const [payAmount, setPayAmount] = useState(prefillAmount);
  const [payStatus, setPayStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function loadData() {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchPayments();
      setPayments(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  async function handlePayment(e) {
    e.preventDefault();
    setIsSubmitting(true);
    setPayStatus("");
    
    try {
      await createPayment({
        property: payProperty,
        amount: parseInt(payAmount, 10),
        dueDate: new Date().toISOString().split('T')[0],
        status: "Paid"
      });
      setPayStatus("success");
      setPayProperty("");
      setPayAmount("");
      loadData();
      
      setTimeout(() => setPayStatus(""), 4000);
    } catch (err) {
      setPayStatus("error:" + err.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#f3f8f6]">
      <main className="wrapper page">
        
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Payments Portal</h1>
          <p className="text-teal-700 mt-2 text-lg">Securely pay rent or deposits, and track your payment history.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Payment Form */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl shadow-sm border border-teal-50 p-6 xl:p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5 text-teal-800 pointer-events-none">
                <svg className="w-32 h-32 -mr-8 -mt-8" fill="currentColor" viewBox="0 0 24 24"><path d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg>
              </div>

              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <svg className="w-5 h-5 mr-2 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                Make a Payment
              </h2>
              
              {payStatus && (
                <div className={`p-4 rounded-xl mb-6 text-sm font-medium flex items-start gap-3 ${payStatus === 'success' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-red-50 text-red-800 border border-red-200'}`}>
                  {payStatus === 'success' ? (
                    <>
                      <svg className="w-5 h-5 text-emerald-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                      <p>Payment processed successfully! Receipt has been saved.</p>
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5 text-red-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                      <p>Payment failed: {payStatus.replace('error:', '')}</p>
                    </>
                  )}
                </div>
              )}
              
              <form onSubmit={handlePayment} className="relative z-10">
                <div className="mb-5">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Property / Purpose</label>
                  <input 
                    type="text" 
                    value={payProperty}
                    onChange={e => setPayProperty(e.target.value)}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-shadow outline-none bg-gray-50 focus:bg-white"
                    placeholder="e.g. Skyline Residency Rent"
                  />
                </div>
                
                <div className="mb-8">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Amount (INR)</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold">₹</span>
                    <input 
                      type="number" 
                      value={payAmount}
                      onChange={e => setPayAmount(e.target.value)}
                      required
                      min="1"
                      className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-shadow outline-none bg-gray-50 focus:bg-white font-semibold text-lg"
                      placeholder="0"
                    />
                  </div>
                </div>
                
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-teal-700 hover:bg-teal-800 text-white font-bold py-4 px-6 rounded-xl transition-all active:scale-95 shadow-md flex justify-center items-center gap-2 disabled:opacity-70 disabled:active:scale-100"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="w-5 h-5 animate-spin text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                      Processing...
                    </>
                  ) : (
                    <>
                      <span>Pay Now</span>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                    </>
                  )}
                </button>
                <p className="text-center text-xs text-gray-400 mt-4 flex items-center justify-center gap-1">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"></path></svg>
                  256-bit SSL encryption
                </p>
              </form>
            </div>
          </div>
          
          {/* Payment History */}
          <div className="lg:col-span-7">
            <h2 className="text-xl font-bold text-gray-900 mb-6 mt-4 lg:mt-0 flex items-center">
              <svg className="w-5 h-5 mr-2 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path></svg>
              Payment History
            </h2>
            
            {error && (
              <div className="bg-red-50 text-red-800 p-4 rounded-xl border border-red-100 mb-6">
                Error loading history: {error}
              </div>
            )}

            {loading ? (
              <div className="bg-white rounded-2xl shadow-sm border border-teal-50 p-12 flex flex-col items-center justify-center">
                <div className="w-10 h-10 border-4 border-teal-100 border-t-teal-600 rounded-full animate-spin mb-4"></div>
                <p className="text-teal-700 font-medium">Loading history...</p>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-sm border border-teal-50 overflow-hidden">
                {payments.length === 0 ? (
                  <div className="p-12 text-center text-gray-500 italic flex flex-col items-center">
                    <svg className="w-12 h-12 text-gray-300 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                    No payment records found.
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full text-left whitespace-nowrap">
                      <thead>
                        <tr className="bg-gray-50/80 border-b border-gray-100">
                          <th className="px-6 py-4 font-semibold text-gray-600 text-sm">Property</th>
                          <th className="px-6 py-4 font-semibold text-gray-600 text-sm">Amount</th>
                          <th className="px-6 py-4 font-semibold text-gray-600 text-sm">Date</th>
                          <th className="px-6 py-4 font-semibold text-gray-600 text-sm text-right">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {payments.map((item) => (
                          <tr key={item.id} className="hover:bg-gray-50/50 transition-colors">
                            <td className="px-6 py-4">
                              <p className="font-bold text-gray-900">{item.property}</p>
                              <p className="text-xs text-gray-400 font-mono mt-0.5">ID: {item.id}</p>
                            </td>
                            <td className="px-6 py-4 font-bold text-gray-900">
                              ₹{item.amount.toLocaleString("en-IN")}
                            </td>
                            <td className="px-6 py-4 text-gray-600 text-sm">
                              {item.dueDate}
                            </td>
                            <td className="px-6 py-4 text-right">
                              <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider ${
                                item.status === 'Paid' 
                                  ? 'bg-emerald-100 text-emerald-800' 
                                  : item.status === 'Overdue'
                                  ? 'bg-red-100 text-red-800'
                                  : 'bg-amber-100 text-amber-800'
                              }`}>
                                {item.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

export default function PaymentsPage() {
  return (
    <>
      <TopNav />
      <Suspense fallback={
        <div className="min-h-screen bg-[#f3f8f6] flex items-center justify-center h-[60vh]">
          <div className="w-12 h-12 border-4 border-teal-200 border-t-teal-600 rounded-full animate-spin"></div>
        </div>
      }>
        <PaymentContent />
      </Suspense>
    </>
  );
}
