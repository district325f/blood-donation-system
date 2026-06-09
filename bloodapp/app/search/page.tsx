"use client";
import { useState } from 'react';
import Link from 'next/link';

export default function DonorSearch() {
    const [donors, setDonors] = useState([]);
    const [bloodGroup, setBloodGroup] = useState('');
    const [district, setDistrict] = useState('');
    const [loading, setLoading] = useState(false);
    const [selectedDonor, setSelectedDonor] = useState<any>(null);
    const [searched, setSearched] = useState(false);

    const districtList = ["Achham", "Arghakhanchi", "Baglung", "Baitadi", "Bajhang", "Bajura", "Banke", "Bara", "Bardiya", "Bhaktapur", "Bhojpur", "Chitwan", "Dadeldhura", "Dailekh", "Dang", "Darchula", "Dhading", "Dhankuta", "Dhanusha", "Dolakha", "Dolpa", "Doti", "Eastern Rukum", "Gorkha", "Gulmi", "Humla", "Ilam", "Jajarkot", "Jhapa", "Jumla", "Kailali", "Kalikot", "Kanchanpur", "Kapilvastu", "Kaski", "Kathmandu", "Kavrepalanchok", "Khotang", "Lalitpur", "Lamjung", "Mahottari", "Makwanpur", "Manang", "Morang", "Mugu", "Mustang", "Myagdi", "Nawalpur", "Parasi", "Nuwakot", "Okhaldhunga", "Palpa", "Panchthar", "Parbat", "Parsa", "Pyuthan", "Ramechhap", "Rasuwa", "Rautahat", "Rolpa", "Rupandehi", "Salyan", "Sankhuwasabha", "Saptari", "Sarlahi", "Sindhuli", "Sindhupalchok", "Siraha", "Solukhumbu", "Sunsari", "Surkhet", "Syangja", "Tanahun", "Taplejung", "Tehrathum", "Udayapur", "Western Rukum"];

    const handleSearch = async () => {
        if (!bloodGroup || !district) {
            alert("कृपया ब्लड ग्रुप र जिल्ला दुवै चयन गर्नुहोस् !");
            return;
        }
        setLoading(true);
        setSearched(false);
        
        const API_URL = "https://script.google.com/macros/s/AKfycbyXSe4JQoCLY_SQ1Nw9ltY6ajLmoIRzLkwORup5bVdqD_eKvU2p_p5TF6wgyFoAjIeU0w/exec" + "?sheet=Donors&_=" + new Date().getTime(); 
        
        try {
            const res = await fetch(API_URL);
            const data = await res.json();
            
            // सर्च लजिकलाई थप भरपर्दो बनाइएको
            const filtered = data.filter((d: any) => 
                d.BloodGroup?.trim() === bloodGroup &&
                d.District?.toString().toLowerCase().trim() === district.toLowerCase().trim()
            );
            
            setDonors(filtered);
            setSearched(true);
        } catch (err) {
            alert("डाटा लोड गर्दा समस्या आयो ।");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <div className="flex-grow p-6">
                <div className="max-w-xl mx-auto bg-white p-8 rounded-2xl shadow-lg border border-slate-100">
                    <Link href="/" className="text-sm text-blue-600 hover:underline mb-4 block">&larr; Back to Home</Link>
                    <h2 className="text-2xl font-bold text-red-600 mb-6 text-center">Donor Search</h2>
                    
                    <div className="space-y-4 mb-8">
                        <select onChange={(e) => setBloodGroup(e.target.value)} className="w-full p-3 border rounded-xl">
                            <option value="">Select Blood Group</option>
                            {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bg => <option key={bg} value={bg}>{bg}</option>)}
                        </select>
                        <select onChange={(e) => setDistrict(e.target.value)} className="w-full p-3 border rounded-xl">
                            <option value="">Select District</option>
                            {districtList.sort().map(d => <option key={d} value={d}>{d}</option>)}
                        </select>
                        <button onClick={handleSearch} disabled={loading} className="w-full bg-red-600 text-white p-3 rounded-xl font-bold hover:bg-red-700 transition">
                            {loading ? "Searching..." : "Search Donors"}
                        </button>
                    </div>

                    {searched && donors.length === 0 && (
                        <p className="text-center text-gray-500">माफ गर्नुहोस्, यो ब्लड ग्रुप र जिल्लामा हाल कुनै डोनर भेटिएन ।</p>
                    )}

                    <div className="space-y-4">
                        {donors.map((d: any, i) => (
                            <div key={i} className="p-4 border border-slate-200 rounded-xl flex justify-between items-center bg-white shadow-sm">
                                <div className="flex-1 mr-2">
                                    <p className="font-bold text-gray-900 text-lg">{d.Name}</p>
                                    <p className="text-sm text-gray-500 font-medium">{d.BloodGroup} | {d.District}</p>
                                </div>
                                <button onClick={() => setSelectedDonor(d)} className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold text-xs whitespace-nowrap hover:bg-blue-700 transition shadow-sm">
                                    Contact
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Modal */}
            {selectedDonor && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                    <div className="bg-white p-6 rounded-2xl w-full max-w-sm">
                        <h3 className="font-bold mb-4 text-center">Contact {selectedDonor.Name}</h3>
                        <div className="space-y-3">
                            <a href={`tel:+977${selectedDonor.Phone}`} className="block text-center bg-green-600 text-white py-3 rounded-xl font-bold">Call Now</a>
                            <a 
                                href={`https://wa.me/+977${selectedDonor.Phone}?text=${encodeURIComponent(`नमस्ते ${selectedDonor.Name} जी, मैले 'Blood Management System' बाट तपाईंको जानकारी पाएको हुँ । ${selectedDonor.BloodGroup} रगतको आवश्यकता परेकोले के तपाईं रक्तदान गर्न सक्नुहुन्छ ? कृपया जानकारी दिनुहोला । धन्यवाद !`)}`} 
                                target="_blank" 
                                className="block text-center bg-emerald-500 text-white py-3 rounded-xl font-bold"
                            >
                                WhatsApp Message
                            </a>
                            <button onClick={() => setSelectedDonor(null)} className="w-full py-2 text-gray-500">Cancel</button>
                        </div>
                    </div>
                </div>
            )}

            <footer className="bg-white border-t py-6 text-center text-gray-600 text-sm">
                <p>Design By: <span className="font-bold text-red-600">Nirajan Aryal</span></p>
                <p>Contact: <span className="font-bold">9851113811</span></p>
            </footer>
        </div>
    );
}
