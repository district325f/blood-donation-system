"use client";
import { useState } from 'react';
import Link from 'next/link';

export default function DonorSearch() {
    const [donors, setDonors] = useState([]);
    const [bloodGroup, setBloodGroup] = useState('');
    const [district, setDistrict] = useState('');
    const [loading, setLoading] = useState(false);

    // ७७ जिल्लाहरूको English नाम (तपाईंको गुगल सिटसँग मिल्ने गरी)
    const districtList = [
        "Achham", "Arghakhanchi", "Ilam", "Udayapur", "Okhaldhunga", "Kanchanpur", "Kapilvastu", "Kathmandu", 
        "Kavrepalanchok", "Kalikot", "Kaski", "Kailali", "Khotang", "Gulmi", "Jumla", "Dadeldhura", "Doti", 
        "Dolpa", "Tanahun", "Taplejung", "Tehrathum", "Dang", "Darchula", "Dolakha", "Dhading", "Dhankuta", 
        "Dhanusha", "Nawalpur", "Parasi", "Nuwakot", "Parbat", "Parsa", "Palpa", "Panchthar", "Pyuthan", 
        "Banke", "Bajura", "Baglung", "Bara", "Bajhang", "Bardiya", "Bhaktapur", "Bhojpur", "Makwanpur", 
        "Manang", "Mahottari", "Mugu", "Mustang", "Morang", "Myagdi", "Rukum East", "Rukum West", "Rupandehi", 
        "Rautahat", "Rasuwa", "Ramechhap", "Rolpa", "Lamjung", "Lalitpur", "Sankhuwasabha", "Saptari", 
        "Sarlahi", "Salyan", "Sindhupalchok", "Sindhuli", "Siraha", "Sunsari", "Surkhet", "Solukhumbu", 
        "Syangja", "Humla", "Chitwan", "Jhapa", "Baitadi", "Khotang", "Dolpa"
    ];

    const handleSearch = async () => {
        setLoading(true);
        const API_URL = "https://sheetdb.io/api/v1/aznz062wqigwm?sheet=Donors"; 
        
        try {
            const res = await fetch(API_URL);
            const data = await res.json();
            
            // Filter: District को नाम case-insensitive म्याच गराउने
            const filtered = data.filter((d: any) => 
                (bloodGroup ? d.BloodGroup === bloodGroup : true) &&
                (district ? d.District.toLowerCase() === district.toLowerCase() : true)
            );
            setDonors(filtered);
        } catch (err) {
            alert("Error loading data.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 p-6">
            <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-lg border border-slate-100">
                <Link href="/" className="text-sm text-blue-600 hover:underline mb-4 block">&larr; Home</Link>
                <h2 className="text-2xl font-bold text-red-600 mb-6 text-center">Donor Search</h2>
                
                <div className="space-y-4 mb-8">
                    <select onChange={(e) => setBloodGroup(e.target.value)} className="w-full p-3 border rounded-xl">
                        <option value="">All Blood Groups</option>
                        {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bg => <option key={bg} value={bg}>{bg}</option>)}
                    </select>

                    <select onChange={(e) => setDistrict(e.target.value)} className="w-full p-3 border rounded-xl">
                        <option value="">All Districts</option>
                        {districtList.sort().map(d => <option key={d} value={d}>{d}</option>)}
                    </select>

                    <button onClick={handleSearch} disabled={loading} className="w-full bg-red-600 text-white p-3 rounded-xl font-bold hover:bg-red-700 transition">
                        {loading ? "Searching..." : "Search Donors"}
                    </button>
                </div>

                <div className="space-y-4">
                    {donors.map((d: any, i) => (
                        <div key={i} className="p-4 border border-slate-200 rounded-xl flex justify-between items-center bg-slate-50">
                            <div>
                                <p className="font-bold text-gray-800">{d.Name}</p>
                                <p className="text-sm text-gray-500">{d.BloodGroup} | {d.District}</p>
                            </div>
                            <a href={`tel:${d.Phone}`} className="bg-green-600 text-white px-5 py-2 rounded-lg font-bold text-sm hover:bg-green-700">Call</a>
                        </div>
                    ))}
                    {donors.length === 0 && !loading && <p className="text-center text-gray-400">No donors found.</p>}
                </div>
            </div>
        </div>
    );
}
