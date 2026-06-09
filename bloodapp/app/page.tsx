"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Home() {
  const [requests, setRequests] = useState([]);
  const API_URL = "https://script.google.com/macros/s/AKfycbyXSe4JQoCLY_SQ1Nw9ltY6ajLmoIRzLkwORup5bVdqD_eKvU2p_p5TF6wgyFoAjIeU0w/exec?sheet=Requests";

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        // डाटालाई उल्टो क्रममा देखाउने
        setRequests(data.reverse());
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Header */}
      <section className="bg-white border-b py-10 px-6 text-center">
        <h1 className="text-4xl font-extrabold text-red-600 mb-4">Blood Management System</h1>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/register" className="bg-red-600 text-white font-bold py-3 px-8 rounded-xl shadow">Register Donor</Link>
          <Link href="/requests" className="bg-blue-600 text-white font-bold py-3 px-8 rounded-xl shadow">Make a Request</Link>
          <Link href="/search" className="bg-green-600 text-white font-bold py-3 px-8 rounded-xl shadow">Donor Search</Link>
        </div>
      </section>

      {/* Requests */}
      <section className="max-w-5xl mx-auto py-10 px-4">
        <h2 className="text-2xl font-bold mb-6">Recent Blood Requests</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {requests.map((req: any, index: number) => (
            <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
              <div className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full inline-block mb-3">
                {req.Units} UNITS NEEDED
              </div>
              <h3 className="text-xl font-bold text-gray-900">{req.PatientName}</h3>
              <p className="text-sm text-gray-600">Hospital: {req.HospitalName}</p>
              
              {/* मिति र समयलाई यहाँ सिधै स्ट्रिङको रूपमा देखाइएको छ */}
              <div className="flex justify-between text-[11px] text-gray-500 mt-4 font-mono bg-slate-100 p-2 rounded">
                <span>📅 {req.Date}</span>
                <span>🕒 {req.Time}</span>
              </div>
              
              <a href={`tel:${req.Phone}`} className="w-full mt-4 bg-green-600 text-white font-bold py-3 rounded-xl block text-center">
                Call Now
              </a>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
