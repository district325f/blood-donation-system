"use client";
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        const API_URL = "https://sheetdb.io/api/v1/aznz062wqigwm?sheet=Requests";
        fetch(API_URL)
            .then((res) => res.json())
            .then((data) => setRequests(data))
            .catch((err) => console.log(err));
    }, []);

    return (
        <main className="min-h-screen bg-slate-50 flex flex-col">
            {/* Hero Section */}
            <section className="bg-white border-b py-10 px-6 text-center">
                <div className="flex justify-center mb-4">
                    <Image src="/blood-logo.png" alt="Blood Logo" width={100} height={100} />
                </div>

                <h1 className="text-4xl font-extrabold text-red-600 mb-4">Blood Management System</h1>
                <p className="text-gray-600 mb-8 max-w-lg mx-auto">तपाईंको सानो सहयोगले कसैको जीवन बचाउन सक्छ । त्यसैले डोनरको रूपमा दर्ता हुनुहोस् ।</p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link href="/register" className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-xl shadow-lg transition">Register New Donor</Link>
                    <Link href="/requests" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-xl shadow-lg transition">Make a Request</Link>
                </div>
            </section>

            {/* Recent Requests Section */}
            <section className="flex-grow max-w-5xl mx-auto py-10 px-4 w-full">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
                    <span className="w-2 h-8 bg-red-600 rounded mr-3"></span>
          Recent Blood Requests
        </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {requests && requests.length > 0 ? (
                        requests.slice().reverse().map((req: any, index: number) => (
                            <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 hover:shadow-xl transition relative">

                                {/* युनिट्सको युनिक स्टिकर डिजाइन */}
                                <div className="absolute top-4 right-4 bg-red-600 text-white text-[10px] font-black px-3 py-1 rounded-full shadow-md uppercase tracking-widest">
                                    {req.Units} Units Needed
                </div>

                                <div className="flex justify-between items-start mb-4 mt-2">
                                    <span className="text-3xl font-black text-red-600 bg-red-50 w-16 h-16 flex items-center justify-center rounded-2xl">{req.BloodGroup}</span>
                                </div>

                                <h3 className="text-xl font-bold text-gray-900">{req.PatientName}</h3>
                                <p className="text-sm text-gray-600 font-medium">Hospital: {req.HospitalName}</p>
                                <p className="text-xs text-gray-400 mt-1 mb-4">{req.District}</p>

                                <div className="pt-4 border-t flex justify-between items-center">
                                    <a href={`tel:${req.Phone}`} className="w-full bg-green-600 text-white text-sm font-bold py-3 rounded-xl hover:bg-green-700 transition flex items-center justify-center">
                                        Call Now
                    </a>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-gray-500 italic">हाल कुनै पनि रिक्वेस्टहरू उपलब्ध छैनन्।</p>
                    )}
                </div>
            </section>

            {/* Footer Section */}
            <footer className="bg-white border-t py-6 text-center text-gray-600 text-sm">
                <p>Design By: <span className="font-bold text-red-600">Nirajan Aryal</span></p>
                <p>Contact: <span className="font-bold">9851113811</span></p>
            </footer>
        </main>
    );
}