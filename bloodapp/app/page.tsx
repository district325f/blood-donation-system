"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function HomePage() {
    const [requests, setRequests] = useState([]);

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                // Safari को लागि cache busting थपिएको
                const res = await fetch("https://sheetdb.io/api/v1/aznz062wqigwm?sheet=Requests&_=" + new Date().getTime(), { cache: 'no-store' });
                const data = await res.json();
                setRequests(data);
            } catch (err) {
                console.error("Error fetching requests:", err);
            }
        };
        fetchRequests();
    }, []);

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col items-center p-4">
            {/* Logo and Header */}
            <div className="w-full max-w-sm text-center mb-6">
                <h1 className="text-2xl font-bold text-red-600 mb-2">Blood Management System</h1>
                <p className="text-sm text-gray-600">तपाईंको सानो सहयोगले कसैको जीवन बचाउन सक्छ ।</p>
            </div>

            {/* Main Action Buttons */}
            <div className="w-full max-w-sm space-y-4 mb-8">
                <Link href="/register" className="block w-full bg-red-600 text-white text-center py-3 rounded-xl font-bold hover:bg-red-700">Register New Donor</Link>
                <Link href="/request" className="block w-full bg-blue-600 text-white text-center py-3 rounded-xl font-bold hover:bg-blue-700">Make a Request</Link>
                <Link href="/search" className="block w-full bg-green-600 text-white text-center py-3 rounded-xl font-bold hover:bg-green-700">Donor Search</Link>
            </div>

            {/* Recent Blood Requests Section */}
            <div className="w-full max-w-sm bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
                <h2 className="text-lg font-bold mb-4 text-gray-800 border-l-4 border-red-600 pl-3">Recent Blood Requests</h2>
                
                {requests.length === 0 ? (
                    <p className="text-gray-500 text-sm italic">हाल कुनै पनि रिक्वेस्टहरू उपलब्ध छैनन् ।</p>
                ) : (
                    <div className="space-y-4">
                        {requests.slice(-3).reverse().map((req: any, i) => (
                            <div key={i} className="border-b border-gray-100 pb-2">
                                <p className="font-bold text-gray-800">{req.Name} - <span className="text-red-600">{req.BloodGroup}</span></p>
                                <p className="text-sm text-gray-600">{req.Hospital} | {req.District}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Footer */}
            <footer className="mt-10 text-center text-gray-600 text-sm">
                <p>Design By: <span className="font-bold text-red-600">Nirajan Aryal</span></p>
                <p>Contact: <span className="font-bold">9851113811</span></p>
            </footer>
        </div>
    );
}
