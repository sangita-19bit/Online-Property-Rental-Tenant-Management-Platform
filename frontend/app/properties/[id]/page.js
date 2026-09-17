import TopNav from "../../components/TopNav";
import { fetchPropertyById } from "../../lib/api";
import Link from "next/link";

export default async function PropertyDetails({ params }) {
  const { id } = await params;
  let property = null;
  let error = null;

  try {
    property = await fetchPropertyById(id);
  } catch (e) {
    error = e.message;
  }

  if (error || !property) {
    return (
      <div className="min-h-screen bg-[#f3f8f6]">
        <TopNav />
        <main className="wrapper page">
          <div className="bg-white rounded-2xl shadow-sm border border-teal-50 text-center p-12 mt-8">
            <svg className="w-16 h-16 mx-auto text-red-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path></svg>
            <p className="text-xl text-gray-800 font-bold mb-2">Oops!</p>
            <p className="text-gray-500 mb-6">{error || "Property not found"}</p>
            <Link href="/" className="inline-block bg-teal-700 hover:bg-teal-800 text-white font-bold py-3 px-6 rounded-xl transition-all active:scale-95 shadow-md">
              &larr; Back to Listings
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f3f8f6]">
      <TopNav />
      <main className="wrapper page py-8">
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center text-teal-700 hover:text-teal-900 font-semibold transition-colors">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
            Back to Listings
          </Link>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Image & Details */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-teal-50">
              {property.image ? (
                <div className="aspect-[4/3] relative w-full bg-teal-50">
                  <img src={property.image} alt={property.title} className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="aspect-[4/3] w-full bg-teal-50 flex items-center justify-center border-b border-teal-50">
                  <p className="text-teal-400 font-medium">No Image Available</p>
                </div>
              )}
            </div>
            
            <div className="bg-white rounded-2xl shadow-sm border border-teal-50 p-6 md:p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                <svg className="w-6 h-6 mr-2 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                About this property
              </h2>
              <p className="text-gray-600 leading-relaxed text-lg mb-8">{property.description}</p>
              
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <svg className="w-6 h-6 mr-2 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path></svg>
                Amenities
              </h3>
              
              <ul className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {property.amenities?.map((am, i) => (
                  <li key={i} className="flex items-center text-gray-700 bg-gray-50 py-2 px-3 rounded-lg border border-gray-100">
                    <svg className="w-4 h-4 mr-2 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                    {am}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* Right Column: Pricing & Action */}
          <div className="lg:col-span-5 sticky top-24">
            <div className="bg-white rounded-2xl shadow-lg border border-teal-100 p-6 md:p-8">
              <div className="flex justify-between items-start mb-2">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">{property.title}</h1>
              </div>
              
              <div className="flex items-center mb-6">
                <span className={`px-3 py-1 rounded-full text-xs font-bold shadow-sm mr-3 ${property.type === 'Sale' ? 'bg-emerald-100 text-emerald-800' : 'bg-teal-100 text-teal-800'}`}>
                  {property.type}
                </span>
                <p className="text-teal-700 font-medium flex items-center">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                  {property.city}
                </p>
              </div>
              
              <div className="bg-gray-50 rounded-xl p-6 mb-8 border border-gray-100">
                <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-1">Asking Price</p>
                <p className="text-4xl font-black text-gray-900 tracking-tight">
                  ₹{property.rent?.toLocaleString("en-IN")}
                  {property.type === 'Rent' && <span className="text-lg font-medium text-gray-500 ml-1 font-normal">/month</span>}
                </p>
              </div>
              
              <div className="grid grid-cols-2 gap-3 mb-8">
                <div className="bg-teal-50/50 p-4 rounded-xl border border-teal-100 flex flex-col items-center justify-center">
                  <svg className="w-6 h-6 text-teal-600 mb-1 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
                  <p className="text-xs font-semibold text-gray-500 uppercase">Bedrooms</p>
                  <p className="text-xl font-bold text-gray-900">{property.bedrooms}</p>
                </div>
                <div className="bg-teal-50/50 p-4 rounded-xl border border-teal-100 flex flex-col items-center justify-center">
                  <svg className="w-6 h-6 text-teal-600 mb-1 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg>
                  <p className="text-xs font-semibold text-gray-500 uppercase">Bathrooms</p>
                  <p className="text-xl font-bold text-gray-900">{property.bathrooms}</p>
                </div>
                <div className="bg-teal-50/50 p-4 rounded-xl border border-teal-100 flex flex-col items-center justify-center">
                  <svg className="w-6 h-6 text-teal-600 mb-1 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"></path></svg>
                  <p className="text-xs font-semibold text-gray-500 uppercase">Area</p>
                  <p className="text-xl font-bold text-gray-900">{property.area} sqft</p>
                </div>
                <div className="bg-teal-50/50 p-4 rounded-xl border border-teal-100 flex flex-col items-center justify-center">
                  <svg className="w-6 h-6 text-teal-600 mb-1 opacity-70" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                  <p className="text-xs font-semibold text-gray-500 uppercase">Status</p>
                  <p className="text-xl font-bold text-gray-900">{property.status}</p>
                </div>
              </div>
              
              <div className="mb-8 space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-500">Listed by</span>
                  <span className="font-bold text-gray-900">{property.sellerInfo}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm text-gray-500">Available From</span>
                  <span className="font-bold text-gray-900">{property.availableFrom}</span>
                </div>
              </div>
              
              <Link 
                href={`/payment?propertyId=${property.id}&title=${encodeURIComponent(property.title)}&amount=${property.rent}`} 
                className="w-full bg-amber-500 hover:bg-amber-400 text-amber-950 font-bold py-4 px-6 rounded-xl transition-all active:scale-95 shadow-md flex justify-center items-center gap-2 text-lg"
              >
                <span>{property.type === 'Rent' ? 'Pay Rent & Book' : 'Pay Deposit & Book'}</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
